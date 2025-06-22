import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ type: User })
  @Post("register")
    register(@Body() dto: RegisterDto){
      return this.authService.register(dto)
    }

  @ApiOperation({ summary: 'Login and get token' })
  @ApiResponse({ type: User })
  @Post("login")
    login(@Body() dto: LoginDto){
      return this.authService.login(dto)
    }
}
