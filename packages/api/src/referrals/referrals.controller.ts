import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReferralsService } from './referrals.service';

@ApiTags('Referrals')
@Controller({ path: 'referrals', version: '1' })
export class ReferralsController {
  constructor(private readonly referralsService: ReferralsService) {}

  @Post('apply')
  @ApiOperation({ summary: 'Apply friend referral code' })
  async applyCode(@Body() body: { code: string; userId: string }) {
    return this.referralsService.applyReferralCode(body.code, body.userId);
  }

  @Get('my')
  @ApiOperation({ summary: 'Get user referral history and earned wallet credit' })
  async getMyReferrals(@Query('userId') userId: string) {
    return this.referralsService.getMyReferrals(userId);
  }
}

