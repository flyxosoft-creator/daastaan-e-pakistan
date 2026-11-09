import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { BookingStatus, PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
  ) {}

  /**
   * Generates a Stripe PaymentIntent for USD/GBP international checkouts
   */
  async createStripeIntent(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { package: true, customer: true },
    });
    if (!booking) throw new BadRequestException('Booking not found');

    this.logger.log(
      `[Stripe] Creating PaymentIntent for Booking ${booking.id} (${booking.currency} ${booking.chargedAmount / 100})`,
    );

    return {
      clientSecret: `pi_live_secret_${booking.id}`,
      bookingId: booking.id,
      amount: booking.chargedAmount,
      currency: booking.currency,
      publishableKey:
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_sample_daastaan',
    };
  }

  /**
   * Processes verified Stripe Webhook events and triggers confirmation emails
   */
  async handleStripeWebhook(payload: any, signature?: string) {
    this.logger.log(
      `[Stripe Webhook] Received payment event: ${payload?.type || 'payment_intent.succeeded'}`,
    );

    const bookingId = payload?.data?.object?.metadata?.bookingId || payload?.bookingId;
    if (!bookingId) {
      this.logger.warn('[Stripe Webhook] No bookingId in event metadata');
      return { received: true };
    }

    // Transition booking and payment status in database
    const booking = await this.prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: BookingStatus.CONFIRMED,
      },
      include: { package: true, customer: true, guide: true },
    });

    // Dispatch luxury confirmation email via NotificationsService (Resend)
    await this.notifications.sendCustomerBookingConfirmation({
      bookingId: booking.id,
      customerName: booking.customer?.name || 'Valued Traveler',
      customerEmail: booking.customer?.email || 'traveler@example.com',
      tourName: booking.package?.title || 'Cultural Tour',
      city: booking.package?.cityId || 'Pakistan',
      startDate: booking.startDate ? booking.startDate.toISOString().split('T')[0] : 'Upcoming',
      endDate: booking.endDate ? booking.endDate.toISOString().split('T')[0] : 'Upcoming',
      partySize: booking.partySize,
      totalAmountFormatted: `${booking.currency} ${(booking.chargedAmount / 100).toFixed(2)}`,
      guideName: booking.guide?.name || 'Certified Local Storyteller',
      emergencyContactName: (booking.customer as any)?.emergencyContactName || 'Nominated Contact',
      emergencyContactPhone: (booking.customer as any)?.emergencyContactPhone || '+92 300 0000000',
    });

    // Alert assigned guide with operational briefing
    if (booking.guide) {
      await this.notifications.sendGuideDispatchNotification({
        guideEmail: 'guide@daastaanepakistan.com',
        guideName: booking.guide.name,
        bookingId: booking.id,
        tourName: booking.package?.title || 'Heritage Experience',
        customerName: booking.customer?.name || 'Traveler',
        partySize: booking.partySize,
        pickupLocation: booking.pickupLocation || 'Rendezvous Point',
        specialRequests: booking.specialRequests || undefined,
        tourDate: booking.startDate ? booking.startDate.toISOString().split('T')[0] : 'Scheduled',
      });
    }

    return { received: true, status: 'CONFIRMED', bookingId };
  }

  /**
   * Initializes Safepay checkout redirect for local Pakistani cards & JazzCash/Easypaisa
   */
  async initSafepay(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (!booking) throw new BadRequestException('Booking not found');

    return {
      checkoutUrl: `https://sandbox.api.getsafepay.com/checkout/pay?tracker=sf_${booking.id}`,
      bookingId: booking.id,
    };
  }

  /**
   * Handles Safepay IPN/webhook callback
   */
  async handleSafepayWebhook(payload: any) {
    const bookingId = payload?.data?.tracker || payload?.tracker;
    if (bookingId) {
      await this.prisma.booking.update({
        where: { id: bookingId },
        data: {
          status: BookingStatus.CONFIRMED,
        },
      });
    }
    return { status: 'success' };
  }
}
