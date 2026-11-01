import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NewsletterService } from './newsletter.service';

@ApiTags('Newsletter')
@Controller({ path: 'newsletter', version: '1' })
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  @ApiOperation({ summary: 'Subscribe to Daastaan tourism stories newsletter' })
  async subscribe(@Body() body: { email: string; gdprConsent?: boolean }) {
    return this.newsletterService.subscribe(body.email, body.gdprConsent);
  }

  @Get('unsubscribe')
  @ApiOperation({ summary: 'One-click unsubscribe' })
  async unsubscribe(@Query('token') token: string) {
    return this.newsletterService.unsubscribe(token);
  }
}

