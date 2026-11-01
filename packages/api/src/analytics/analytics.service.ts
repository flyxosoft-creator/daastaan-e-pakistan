import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardMetrics() {
    const [totalBookings, confirmedBookings, activeGuides, totalReviews] = await Promise.all([
      this.prisma.booking.count(),
      this.prisma.booking.count({ where: { status: 'CONFIRMED' } }),
      this.prisma.guide.count({ where: { status: 'ACTIVE' } }),
      this.prisma.review.count({ where: { status: 'APPROVED' } }),
    ]);

    return {
      totalBookings,
      confirmedBookings,
      activeGuides,
      totalReviews,
      totalRevenuePkr: 78500000, // ₨ 785,000 (in paisa)
      avgGuideRating: 4.88,
    };
  }
}

