import { Controller, Post, Body, Headers } from '@nestjs/common';
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

  @Post('stripe/webhook')
  @ApiOperation({ summary: 'Receive Stripe Webhook event and transition booking to CONFIRMED' })
  async handleStripeWebhook(
    @Body() payload: any,
    @Headers('stripe-signature') signature?: string,
  ) {
    return this.paymentsService.handleStripeWebhook(payload, signature);
  }

  @Post('safepay/init')
  @ApiOperation({ summary: 'Initialize Safepay checkout for local PKR payment (JazzCash/Easypaisa)' })
  async initSafepay(@Body() body: { bookingId: string }) {
    return this.paymentsService.initSafepay(body.bookingId);
  }

  @Post('safepay/webhook')
  @ApiOperation({ summary: 'Receive Safepay IPN callback and confirm payment' })
  async handleSafepayWebhook(@Body() payload: any) {
    return this.paymentsService.handleSafepayWebhook(payload);
  }
}
