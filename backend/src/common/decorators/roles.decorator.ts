import { SetMetadata } from '@nestjs/common';
import type { UserRole } from '@prisma/client';

/**
 * Custom decorator to specify required roles for a route
 * Usage: @Roles(UserRole.ADMIN, UserRole.SALON_OWNER)
 */
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
