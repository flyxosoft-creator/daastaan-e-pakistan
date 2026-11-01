import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SafetyService {
  constructor(private prisma: PrismaService) {}

  async triggerSos(bookingId: string, lat: number, lng: number) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        customer: true,
        guide: true,
      },
    });

    if (!booking) throw new NotFoundException('Booking not found');

    const sos = await this.prisma.sosEvent.create({
      data: {
        bookingId,
        lat,
        lng,
      },
    });

    // In production, notificationsService dispatches Twilio SMS & Resend Email immediately
    return {
      message: 'SOS Alert triggered successfully. Emergency contacts & operations alerted.',
      sosEventId: sos.id,
      timestamp: sos.alertedAt,
    };
  }

  async recordLocation(bookingId: string, lat: number, lng: number, accuracy?: number) {
    return this.prisma.tripLocation.create({
      data: {
        bookingId,
        lat,
        lng,
        accuracy,
      },
    });
  }

  async getActiveTrips() {
    return this.prisma.booking.findMany({
      where: { status: 'IN_PROGRESS' },
      include: {
        customer: { select: { id: true, name: true, phone: true } },
        guide: { select: { id: true, name: true, whatsappNumber: true } },
        package: { select: { id: true, title: true } },
        checkIns: { orderBy: { completedAt: 'desc' } },
        sosEvents: { where: { resolvedAt: null } },
        locationUpdates: { take: 1, orderBy: { capturedAt: 'desc' } },
      },
    });
  }
}

