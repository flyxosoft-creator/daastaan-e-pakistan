import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PromoCodesService {
  constructor(private prisma: PrismaService) {}

  async validateCode(code: string, amountPkr: number) {
    const promo = await this.prisma.promoCode.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!promo || !promo.isActive) {
      throw new BadRequestException('Invalid or expired promo code');
    }

    const now = new Date();
    if (now < promo.validFrom || now > promo.validUntil) {
      throw new BadRequestException('Promo code has expired');
    }

    if (promo.minAmountPkr && amountPkr < promo.minAmountPkr) {
      throw new BadRequestException(`Minimum booking amount of ₨ ${(promo.minAmountPkr / 100).toLocaleString()} required`);
    }

    let discountPkr = 0;
    if (promo.discountType === 'PERCENTAGE') {
      discountPkr = Math.round((amountPkr * promo.discountValue) / 100);
    } else {
      discountPkr = promo.discountValue;
    }

    return {
      code: promo.code,
      discountType: promo.discountType,
      discountPkr,
      finalAmountPkr: Math.max(0, amountPkr - discountPkr),
    };
  }
}

