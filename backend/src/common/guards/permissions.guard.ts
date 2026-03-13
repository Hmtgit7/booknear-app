import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { Permission, UserRole } from '../enums/role.enum';
import { roleHasPermission } from '../constants/role-permissions';

type AuthenticatedRequest = Request & {
  user?: {
    role: UserRole;
  };
};

/**
 * PermissionsGuard — fine-grained check on top of RolesGuard.
 * Used with @RequirePermissions(Permission.REVIEW_KYC) on admin routes.
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // No permissions declared — pass through
    if (!requiredPermissions || requiredPermissions.length === 0) return true;

    const { user } = context.switchToHttp().getRequest<AuthenticatedRequest>();

    if (!user) {
      throw new ForbiddenException('Not authenticated');
    }

    const hasAll = requiredPermissions.every((permission) =>
      roleHasPermission(user.role, permission),
    );

    if (!hasAll) {
      throw new ForbiddenException('Insufficient permissions for this action');
    }

    return true;
  }
}
