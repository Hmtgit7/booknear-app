import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JWT Authentication Guard
 * Validates that the request has a valid JWT token
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
