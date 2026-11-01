import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CitiesService {
  constructor(private prisma: PrismaService) {}

  async findAll(onlyActive = true) {
    return this.prisma.city.findMany({
      where: onlyActive ? { isActive: true } : undefined,
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { packages: true, guides: true },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    const city = await this.prisma.city.findUnique({
      where: { slug },
      include: {
        packages: {
          where: { status: 'PUBLISHED' },
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
          },
        },
        guides: {
          where: { status: 'ACTIVE' },
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            rating: true,
            specialities: true,
            gender: true,
          },
        },
      },
    });

    if (!city) throw new NotFoundException(`City '${slug}' not found`);
    return city;
  }
}

