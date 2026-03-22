import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { UserRole } from '@prisma/client';
import type { JwtPayload } from './jwt.strategy';

export interface AuthTokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  /**
   * Generate JWT access token
   */
  generateAccessToken(
    userId: string,
    email: string,
    role: UserRole,
  ): AuthTokenResponse {
    const payload: JwtPayload = {
      id: userId,
      email,
      role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
    };
  }

  /**
   * Validate JWT token
   */
  validateToken(token: string): JwtPayload {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  /**
   * Decode JWT token without verification
   */
  decodeToken(token: string): JwtPayload | null {
    return this.jwtService.decode(token) as JwtPayload | null;
  }
}
