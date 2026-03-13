import type { UserRole } from './enums';

export interface JwtPayload {
  sub: string;
  mobile: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
