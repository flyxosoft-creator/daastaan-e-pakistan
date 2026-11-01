import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';

@ApiTags('Reviews')
@Controller({ path: 'reviews', version: '1' })
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({ summary: 'Submit verified customer review post-trip' })
  async submitReview(@Body() body: any) {
    return this.reviewsService.submit(body);
  }

  @Get('package/:packageId')
  @ApiOperation({ summary: 'Get approved reviews for a specific package' })
  async getPackageReviews(@Param('packageId') packageId: string) {
    return this.reviewsService.findByPackage(packageId);
  }
}

