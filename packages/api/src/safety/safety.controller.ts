import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SafetyService } from './safety.service';

@ApiTags('Safety')
@Controller({ path: 'safety', version: '1' })
export class SafetyController {
  constructor(private readonly safetyService: SafetyService) {}

  @Post('sos')
  @ApiOperation({ summary: 'Trigger one-touch emergency SOS during active trip' })
  async triggerSos(
    @Body() body: { bookingId: string; lat: number; lng: number },
  ) {
    return this.safetyService.triggerSos(body.bookingId, body.lat, body.lng);
  }

  @Post('location')
  @ApiOperation({ summary: 'Submit background Web GPS coordinates during active tour' })
  async recordLocation(
    @Body() body: { bookingId: string; lat: number; lng: number; accuracy?: number },
  ) {
    return this.safetyService.recordLocation(body.bookingId, body.lat, body.lng, body.accuracy);
  }

  @Get('active-trips')
  @ApiOperation({ summary: 'Get active in-progress trips for admin safety operations board' })
  async getActiveTrips() {
    return this.safetyService.getActiveTrips();
  }
}

