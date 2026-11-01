import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PackagesService } from './packages.service';
import { PackageTier } from '@prisma/client';

@ApiTags('Packages')
@Controller({ path: 'packages', version: '1' })
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get()
  @ApiOperation({ summary: 'Browse and filter tour packages' })
  async getPackages(
    @Query('city') city?: string,
    @Query('tier') tier?: PackageTier,
    @Query('duration') duration?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('sort') sort?: 'popular' | 'rating' | 'newest',
  ) {
    return this.packagesService.findAll({
      city,
      tier,
      duration,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 12,
      sort,
    });
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured experiences for homepage carousel' })
  async getFeatured(@Query('limit') limit?: string) {
    return this.packagesService.findFeatured(limit ? parseInt(limit, 10) : 6);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get full package details (including pricing & itinerary)' })
  async getPackageBySlug(@Param('slug') slug: string) {
    return this.packagesService.findBySlug(slug);
  }
}

