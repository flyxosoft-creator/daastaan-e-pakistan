import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async getBlogPosts() {
    return this.prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        category: true,
        readTimeMin: true,
        publishedAt: true,
      },
    });
  }

  async getFaqs() {
    return this.prisma.faq.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
  }
}

