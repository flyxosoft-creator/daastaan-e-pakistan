import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContentService } from './content.service';

@ApiTags('Content')
@Controller({ path: 'content', version: '1' })
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('blog')
  @ApiOperation({ summary: 'Get published blog posts' })
  async getBlogPosts() {
    return this.contentService.getBlogPosts();
  }

  @Get('faq')
  @ApiOperation({ summary: 'Get active FAQ accordion questions & answers' })
  async getFaqs() {
    return this.contentService.getFaqs();
  }
}

