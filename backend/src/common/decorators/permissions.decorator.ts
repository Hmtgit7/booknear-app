import { SetMetadata } from '@nestjs/common';
import { Permission } from '../enums/role.enum';

export const PERMISSIONS_KEY = 'permissions';

/**
 * @RequirePermissions(Permission.REVIEW_KYC)
 * Fine-grained permission check on top of role check.
 * Consumed by PermissionsGuard.
 */
export const RequirePermissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
