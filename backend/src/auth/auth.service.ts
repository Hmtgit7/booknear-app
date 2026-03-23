import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { JwtPayload } from './jwt.strategy';
import type { UserRole } from '../common/decorators/roles.decorator';

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
      return this.jwtService.verify<JwtPayload>(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  /**
   * Decode JWT token without verification
   */
  decodeToken(token: string): JwtPayload | null {
    const decoded: unknown = this.jwtService.decode(token);
    if (!decoded || typeof decoded !== 'object') {
      return null;
    }

    const value = decoded as Record<string, unknown>;
    if (
      typeof value.id !== 'string' ||
      typeof value.email !== 'string' ||
      typeof value.role !== 'string' ||
      typeof value.iat !== 'number' ||
      typeof value.exp !== 'number'
    ) {
      return null;
    }

    return {
      id: value.id,
      email: value.email,
      role: value.role,
      iat: value.iat,
      exp: value.exp,
    };
  }
}
