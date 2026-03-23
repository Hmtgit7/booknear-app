import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import type { JwtPayload } from './jwt.strategy';
import type { UserRole } from '../common/decorators/roles.decorator';
import { PrismaService } from '../database/prisma.service';

export interface AuthTokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
}

export interface AuthUserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  // In some local editor states, generated Prisma model properties are not
  // resolved until TS server refresh. This keeps diagnostics stable.
  private get db(): Record<string, any> {
    return this.prisma as unknown as Record<string, any>;
  }

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

  async login(credentials: LoginCredentials): Promise<{
    user: AuthUserProfile;
    token: AuthTokenResponse;
  }> {
    const email = credentials.email.toLowerCase().trim();
    const user = await this.db.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user.status !== 'ACTIVE') {
      throw new ForbiddenException('User account is not active');
    }

    const isPasswordValid = await compare(
      credentials.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    await this.db.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const token = this.generateAccessToken(
      user.id,
      user.email,
      user.role as UserRole,
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role as UserRole,
      },
      token,
    };
  }

  async register(payload: RegisterPayload): Promise<{
    user: AuthUserProfile;
    token: AuthTokenResponse;
  }> {
    const email = payload.email.toLowerCase().trim();
    const phone = payload.phone.trim();

    const existingUser = await this.db.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
      select: {
        email: true,
        phone: true,
      },
    });

    if (existingUser?.email === email) {
      throw new ConflictException('Email is already in use');
    }

    if (existingUser?.phone === phone) {
      throw new ConflictException('Phone is already in use');
    }

    const passwordHash = await hash(payload.password, 10);

    const user = await this.db.user.create({
      data: {
        email,
        phone,
        passwordHash,
        firstName: payload.firstName.trim(),
        lastName: payload.lastName.trim(),
        role: payload.role,
      },
    });

    if (payload.role === 'CUSTOMER') {
      await this.db.customer.create({
        data: {
          userId: user.id,
        },
      });
    }

    if (payload.role === 'SALON_OWNER') {
      await this.db.salonOwner.create({
        data: {
          userId: user.id,
          businessName: `${user.firstName} ${user.lastName}`,
        },
      });
    }

    const token = this.generateAccessToken(
      user.id,
      user.email,
      user.role as UserRole,
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role as UserRole,
      },
      token,
    };
  }

  async getProfile(userId: string): Promise<AuthUserProfile> {
    const user = await this.db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role as UserRole,
    };
  }
}
