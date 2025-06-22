import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './entities/room.entity';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateRoomDto } from './dto/create-room.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('room')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @ApiOperation({ summary: 'Create new room' })
  @ApiResponse({ type: Room })
  @Post()
  @Roles("ADMIN")
  create(@Body() room: CreateRoomDto) {
    return this.roomService.create(room);
  }

  @ApiOperation({ summary: 'Find all romms' })
  @ApiResponse({ type: [Room] })
  @Get()
  getAll() {
    return this.roomService.findAll();
  }

  @ApiOperation({ summary: 'Edit room' })
  @ApiResponse({ type: Room })
  @Patch(":id")
  @Roles("ADMIN")
  update(@Param("id") id: string, @Body() room: CreateRoomDto) {
    return this.roomService.update(id, room);
  }

  @ApiOperation({ summary: 'Delete room' })
  @ApiResponse({ type: Room })
  @Delete(":id")
  @Roles("ADMIN")
  delete(@Param("id") id: string) {
    return this.roomService.remove(id);
  }
}
