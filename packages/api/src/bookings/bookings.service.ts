import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookingStatus, PaymentGateway, SupportedCurrency } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    customerId: string;
    packageId: string;
    guideId: string;
    startDate: Date;
    endDate: Date;
    partySize: number;
    totalPkr: number;
    currency: SupportedCurrency;
    chargedAmount: number;
    gateway: PaymentGateway;
    safetyLayerOn: boolean;
    pickupLocation?: string;
    specialRequests?: string;
  }) {
    // 15-minute slot hold expiry (FR-090)
    const slotHeldUntil = new Date(Date.now() + 15 * 60 * 1000);

    return this.prisma.booking.create({
      data: {
        ...data,
        status: BookingStatus.PENDING_PAYMENT,
        slotHeldUntil,
      },
    });
  }

  async findById(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        customer: { select: { id: true, name: true, email: true, phone: true } },
        guide: { select: { id: true, name: true, avatarUrl: true, rating: true } },
        package: { select: { id: true, slug: true, title: true, tier: true, images: true } },
        payment: true,
      },
    });

    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }
}

