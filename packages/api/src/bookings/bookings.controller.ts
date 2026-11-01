import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';

@ApiTags('Bookings')
@Controller({ path: 'bookings', version: '1' })
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create initial booking reservation' })
  async createBooking(@Body() body: any) {
    return this.bookingsService.create(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking reservation details' })
  async getBooking(@Param('id') id: string) {
    return this.bookingsService.findById(id);
  }
}

