import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GuidesService } from './guides.service';
import { Gender } from '@prisma/client';

@ApiTags('Guides')
@Controller({ path: 'guides', version: '1' })
export class GuidesController {
  constructor(private readonly guidesService: GuidesService) {}

  @Get('featured')
  @ApiOperation({ summary: 'Get trusted verified guides for homepage strip' })
  async getFeatured(@Query('limit') limit?: string) {
    return this.guidesService.findFeatured(limit ? parseInt(limit, 10) : 6);
  }

  @Get('available')
  @ApiOperation({ summary: 'Find active guides by city and optional gender preference' })
  async getAvailable(
    @Query('cityId') cityId: string,
    @Query('gender') gender?: Gender,
  ) {
    return this.guidesService.findAvailable(cityId, gender);
  }
}

