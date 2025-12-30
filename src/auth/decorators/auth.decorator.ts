import { UseGuards, applyDecorators } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from './roles.decorator';
import { Role } from '@prisma/client';

/**
 * Auth decorator that combines JWT and Roles authentication
 * Usage: @Auth() for JWT only, @Auth('ADMIN', 'OWNER') for role-based
 */
export function Auth(...roles: Role[]) {
  if (roles.length > 0) {
    return applyDecorators(
      Roles(...roles),
      UseGuards(JwtAuthGuard, RolesGuard)
    );
  }

  return applyDecorators(UseGuards(JwtAuthGuard));
}
