import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../decorators/roles.decorator'

export enum AdminRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  OPS_ADMIN = 'OPS_ADMIN',
  CONTENT_MANAGER = 'CONTENT_MANAGER',
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<AdminRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    )

    // No @Roles() decorator means the route is open to all authenticated users
    if (!requiredRoles || requiredRoles.length === 0) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user) {
      throw new ForbiddenException('Not authenticated')
    }

    if (!requiredRoles.includes(user.role as AdminRole)) {
      throw new ForbiddenException(
        `Requires one of the following roles: ${requiredRoles.join(', ')}`,
      )
    }

    return true
  }
}
