import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PromoCodesService } from './promo-codes.service';

@ApiTags('PromoCodes')
@Controller({ path: 'promo-codes', version: '1' })
export class PromoCodesController {
  constructor(private readonly promoCodesService: PromoCodesService) {}

  @Post('validate')
  @ApiOperation({ summary: 'Validate promo code during checkout' })
  async validateCode(@Body() body: { code: string; amountPkr: number }) {
    return this.promoCodesService.validateCode(body.code, body.amountPkr);
  }
}

