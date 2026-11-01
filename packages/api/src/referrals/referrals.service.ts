import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReferralsService {
  constructor(private prisma: PrismaService) {}

  async applyReferralCode(code: string, newUserId: string) {
    const referrer = await this.prisma.user.findUnique({
      where: { referralCode: code.toUpperCase() },
    });

    if (!referrer || referrer.id === newUserId) {
      throw new BadRequestException('Invalid referral code');
    }

    return this.prisma.referral.create({
      data: {
        referrerId: referrer.id,
        refereeId: newUserId,
        creditEarnedPkr: 50000, // PKR 500 default
      },
    });
  }

  async getMyReferrals(userId: string) {
    return this.prisma.referral.findMany({
      where: { referrerId: userId },
      include: {
        referee: { select: { name: true, createdAt: true } },
      },
    });
  }
}

