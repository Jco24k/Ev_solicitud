import { Controller, Post, Body ,HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { AuthDto } from '../dto/auth.dto';


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

}
