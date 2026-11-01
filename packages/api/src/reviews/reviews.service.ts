import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewStatus } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async submit(data: {
    bookingId: string;
    customerId: string;
    packageId: string;
    rating: number;
    title?: string;
    body: string;
    photos?: string[];
  }) {
    // Check eligibility: booking must be COMPLETED (FR-098)
    const booking = await this.prisma.booking.findUnique({
      where: { id: data.bookingId },
    });

    if (!booking || booking.status !== 'COMPLETED') {
      throw new BadRequestException('Reviews can only be submitted for completed bookings');
    }

    return this.prisma.review.create({
      data: {
        ...data,
        photos: data.photos || [],
        status: ReviewStatus.PENDING,
      },
    });
  }

  async findByPackage(packageId: string) {
    return this.prisma.review.findMany({
      where: {
        packageId,
        status: ReviewStatus.APPROVED,
      },
      include: {
        customer: { select: { name: true, country: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

