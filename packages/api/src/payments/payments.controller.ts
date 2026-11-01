import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';

@ApiTags('Payments')
@Controller({ path: 'payments', version: '1' })
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('stripe/intent')
  @ApiOperation({ summary: 'Create Stripe PaymentIntent for international checkout (USD/GBP)' })
  async createStripeIntent(@Body() body: { bookingId: string }) {
    return this.paymentsService.createStripeIntent(body.bookingId);
  }

  @Post('safepay/init')
  @ApiOperation({ summary: 'Initialize Safepay checkout for local PKR payment (JazzCash/Easypaisa)' })
  async initSafepay(@Body() body: { bookingId: string }) {
    return this.paymentsService.initSafepay(body.bookingId);
  }
}

