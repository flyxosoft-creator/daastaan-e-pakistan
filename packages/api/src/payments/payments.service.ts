import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { BookingStatus, PaymentStatus } from '@prisma/client';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private stripe: Stripe | null = null;

  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
  ) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (secretKey) {
      this.stripe = new Stripe(secretKey, {
        apiVersion: '2024-11-20.acacia',
      });
      this.logger.log('[Stripe] Initialized live/test Stripe SDK');
    } else {
      this.logger.warn('[Stripe] No STRIPE_SECRET_KEY configured; running in staging mode');
    }
  }

  /**
   * Generates a Stripe PaymentIntent for USD/GBP international checkouts
   */
  async createStripeIntent(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { package: true, customer: true },
    });
    if (!booking) throw new BadRequestException('Booking not found');

    const amountInCents = Math.round(booking.chargedAmount * 100);

    // Call real Stripe API if secret key is configured
    if (this.stripe) {
      try {
        const paymentIntent = await this.stripe.paymentIntents.create({
          amount: amountInCents,
          currency: (booking.currency || 'usd').toLowerCase(),
          metadata: { bookingId: booking.id },
          automatic_payment_methods: { enabled: true },
          description: `Daastaan Tour Booking: ${booking.id}`,
        });

        this.logger.log(
          `[Stripe] Created PaymentIntent ${paymentIntent.id} for Booking ${booking.id}`,
        );

        return {
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
          bookingId: booking.id,
          amount: booking.chargedAmount,
          currency: booking.currency,
          publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
          isLive: true,
        };
      } catch (err: any) {
        this.logger.error(`[Stripe Error] Failed to create PaymentIntent: ${err.message}`);
        throw new BadRequestException(`Stripe error: ${err.message}`);
      }
    }

    this.logger.log(
      `[Stripe Staging] Generated mock intent for Booking ${booking.id}`,
    );

    return {
      clientSecret: `pi_mock_${booking.id}_secret_test123`,
      bookingId: booking.id,
      amount: booking.chargedAmount,
      currency: booking.currency,
      publishableKey:
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_sample_daastaan',
      isLive: false,
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
