import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../auth/jwt.strategy';

interface RequestWithUser {
  user: JwtPayload;
}

/**
 * Custom decorator to extract current user from JWT token
 * Usage: @CurrentUser() user: JwtPayload
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload => {
    void data;
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
