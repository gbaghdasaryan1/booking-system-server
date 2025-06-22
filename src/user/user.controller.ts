import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @ApiOperation({ summary: 'Finde user by email' })
  @ApiResponse({ type: User })
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userService.findOne(email);
  }
}
