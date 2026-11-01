import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PackageTier, PackageStatus } from '@prisma/client';

export interface CatalogFilterParams {
  city?: string;
  tier?: PackageTier;
  duration?: string;
  page?: number;
  limit?: number;
  sort?: 'popular' | 'rating' | 'newest';
}

@Injectable()
export class PackagesService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: CatalogFilterParams) {
    const { city, tier, duration, page = 1, limit = 12, sort = 'popular' } = params;

    const where: any = {
      status: PackageStatus.PUBLISHED,
    };

    if (city) {
      where.city = { slug: city };
    }

    if (tier) {
      where.tier = tier;
    }

    if (duration === 'half-day') {
      where.durationHours = { lte: 4 };
    } else if (duration === 'full-day') {
      where.durationHours = { gt: 4 };
    } else if (duration === 'multi-day') {
      where.durationDays = { gte: 1 };
    }

    let orderBy: any = { bookingCount: 'desc' };
    if (sort === 'rating') {
      orderBy = { rating: 'desc' };
    } else if (sort === 'newest') {
      orderBy = { createdAt: 'desc' };
    }

    const [total, packages] = await Promise.all([
      this.prisma.package.count({ where }),
      this.prisma.package.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          slug: true,
          title: true,
          tier: true,
          durationHours: true,
          durationDays: true,
          minParty: true,
          maxParty: true,
          rating: true,
          reviewCount: true,
          images: true,
          description: true,
          city: {
            select: { name: true, slug: true },
          },
          // basePricePkr deliberately excluded on catalog card per FR-016
        },
      }),
    ]);

    return {
      packages,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findFeatured(limit = 6) {
    return this.prisma.package.findMany({
      where: {
        status: PackageStatus.PUBLISHED,
        isFeatured: true,
      },
      take: limit,
      select: {
        id: true,
        slug: true,
        title: true,
        tier: true,
        durationHours: true,
        durationDays: true,
        minParty: true,
        maxParty: true,
        rating: true,
        reviewCount: true,
        images: true,
        description: true,
        city: {
          select: { name: true, slug: true },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    const pkg = await this.prisma.package.findUnique({
      where: { slug },
      include: {
        city: { select: { id: true, name: true, slug: true } },
        addOns: { where: { isActive: true } },
        reviews: {
          where: { status: 'APPROVED' },
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            rating: true,
            title: true,
            body: true,
            createdAt: true,
            customer: { select: { name: true, country: true } },
          },
        },
      },
    });

    if (!pkg || pkg.status !== PackageStatus.PUBLISHED) {
      throw new NotFoundException(`Tour package '${slug}' not found`);
    }

    return pkg;
  }
}

