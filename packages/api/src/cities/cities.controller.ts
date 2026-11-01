import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CitiesService } from './cities.service';

@ApiTags('Cities')
@Controller({ path: 'cities', version: '1' })
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active destination cities' })
  async getCities(@Query('onlyActive') onlyActive?: string) {
    const active = onlyActive !== 'false';
    return this.citiesService.findAll(active);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get single city details with published packages and active guides' })
  async getCityBySlug(@Param('slug') slug: string) {
    return this.citiesService.findBySlug(slug);
  }
}

