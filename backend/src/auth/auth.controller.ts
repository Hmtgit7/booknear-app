import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import type { AuthService, AuthTokenResponse } from './auth.service';
import { AuthService as AuthServiceImpl } from './auth.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { JwtPayload } from './jwt.strategy';

export class LoginDto {
  email: string;
  password: string;
}

export class RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export class AuthResponseDto {
  id: string;
  email: string;
  role: string;
  accessToken: string;
  expiresIn: number;
}

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthServiceImpl) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    // TODO: Implement actual login logic with database verification
    // This is a placeholder that demonstrates the token response structure

    const token = this.authService.generateAccessToken(
      'user-id-placeholder',
      loginDto.email,
      'CUSTOMER',
    );

    return {
      id: 'user-id-placeholder',
      email: loginDto.email,
      role: 'CUSTOMER',
      accessToken: token.accessToken,
      expiresIn: token.expiresIn,
    };
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'User registration' })
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    // TODO: Implement actual registration logic with database persistence
    // This is a placeholder that demonstrates the response structure

    const token = this.authService.generateAccessToken(
      'new-user-id-placeholder',
      registerDto.email,
      'CUSTOMER',
    );

    return {
      id: 'new-user-id-placeholder',
      email: registerDto.email,
      role: 'CUSTOMER',
      accessToken: token.accessToken,
      expiresIn: token.expiresIn,
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@CurrentUser() user: JwtPayload): Promise<JwtPayload> {
    return user;
  }
}
