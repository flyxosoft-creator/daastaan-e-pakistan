import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookingStatus, PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async createStripeIntent(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (!booking) throw new BadRequestException('Booking not found');

    // Return client secret mockup for Stripe Elements
    return {
      clientSecret: `pi_mock_${booking.id}_secret`,
      bookingId: booking.id,
      amount: booking.chargedAmount,
      currency: booking.currency,
    };
  }

  async initSafepay(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (!booking) throw new BadRequestException('Booking not found');

    // Return redirect URL for Safepay Checkout (JazzCash/Easypaisa/Cards)
    return {
      checkoutUrl: `https://sandbox.api.getsafepay.com/checkout/pay?tracker=mock_${booking.id}`,
      bookingId: booking.id,
    };
  }
}

