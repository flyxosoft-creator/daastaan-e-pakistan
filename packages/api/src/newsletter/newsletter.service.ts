import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsletterService {
  constructor(private prisma: PrismaService) {}

  async subscribe(email: string, gdprConsent = false) {
    return this.prisma.newsletterSubscriber.upsert({
      where: { email: email.toLowerCase() },
      update: { isActive: true },
      create: {
        email: email.toLowerCase(),
        gdprConsent,
        isActive: true,
      },
    });
  }

  async unsubscribe(token: string) {
    return this.prisma.newsletterSubscriber.updateMany({
      where: { unsubToken: token },
      data: { isActive: false, unsubscribedAt: new Date() },
    });
  }
}

