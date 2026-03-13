import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'types';

export const ROLES_KEY = 'roles';
/** Restrict route to one or more roles.  @Roles(UserRole.ADMIN, UserRole.DOCTOR) */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
