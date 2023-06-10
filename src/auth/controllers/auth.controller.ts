import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { AuthDto } from '../dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserSameGuard } from '../guards/user-same.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiResponse({
    status: HttpStatus.OK,
    type: AuthResponseDto,
    description: 'Auth successful',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description:
      'Incorrect credentials',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description:
      'User is inactive',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() authDto: AuthDto) {
    return await this.authService.authLogin(authDto);
  }

  @UseGuards(AuthGuard(), UserSameGuard)
  @Get(':id')
  async test(@Param('id',ParseUUIDPipe) id: string) {
    return true
  }
}
