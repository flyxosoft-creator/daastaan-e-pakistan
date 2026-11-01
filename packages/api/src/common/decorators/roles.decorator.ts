import { SetMetadata } from '@nestjs/common'
import { AdminRole } from '../guards/roles.guard'

export const ROLES_KEY = 'roles'

/**
 * Restrict a route to the given admin roles.
 * @example @Roles(AdminRole.SUPER_ADMIN, AdminRole.OPS_ADMIN)
 */
export const Roles = (...roles: AdminRole[]) => SetMetadata(ROLES_KEY, roles)
