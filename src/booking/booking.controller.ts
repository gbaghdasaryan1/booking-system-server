import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Booking } from './entities/booking.entity';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('booking')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({ summary: 'Create booking' })
  @ApiResponse({ type: Booking })
  @Post()
  create(@Body() createBookingDto: CreateBookingDto, @Request() req: any) {
    return this.bookingService.create(createBookingDto, req.user.userId);
  }

  @ApiOperation({ summary: 'Find bookings by room id' })
  @ApiResponse({ type: Booking })
  @Get('room/:roomId')
  getBookingsByRoom(@Param('roomId') roomId: string) {
    return this.bookingService.findByRoom(roomId);
  }

  @ApiOperation({ summary: 'Find all bookings' })
  @ApiResponse({ type: [Booking] })
  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.bookingService.findAll();
  }

  @ApiOperation({ summary: 'Find my bookings' })
  @ApiResponse({ type: [Booking] })
  @Get('my')
  getMyBookings(@Request() req: any) {
    return this.bookingService.findByUser(req.user.userId);
  }

  @ApiOperation({ summary: 'Delete booking' })
  @ApiResponse({ type: Booking })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(id);
  }
}
