import { SetMetadata } from '@nestjs/common';

export type UserRole = 'CUSTOMER' | 'SALON_OWNER' | 'SALON_STAFF' | 'ADMIN';

/**
 * Custom decorator to specify required roles for a route
 * Usage: @Roles(UserRole.ADMIN, UserRole.SALON_OWNER)
 */
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
