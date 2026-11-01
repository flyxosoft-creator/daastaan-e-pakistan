import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GuideStatus, Gender } from '@prisma/client';

@Injectable()
export class GuidesService {
  constructor(private prisma: PrismaService) {}

  async findAvailable(cityId: string, genderPref?: Gender) {
    const where: any = {
      cityId,
      status: GuideStatus.ACTIVE,
    };

    if (genderPref) {
      where.gender = genderPref;
    }

    return this.prisma.guide.findMany({
      where,
      select: {
        id: true,
        name: true,
        gender: true,
        avatarUrl: true,
        rating: true,
        reviewCount: true,
        specialities: true,
        languages: true,
        bio: true,
        isVerified: true,
      },
    });
  }

  async findFeatured(limit = 6) {
    return this.prisma.guide.findMany({
      where: {
        status: GuideStatus.ACTIVE,
        isVerified: true,
      },
      take: limit,
      orderBy: { rating: 'desc' },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        rating: true,
        specialities: true,
        city: { select: { name: true } },
      },
    });
  }
}

