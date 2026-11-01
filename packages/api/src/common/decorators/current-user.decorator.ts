import { createParamDecorator, ExecutionContext } from '@nestjs/common'

/**
 * Parameter decorator that extracts the currently authenticated user
 * from the request object (populated by Passport after JwtAuthGuard).
 *
 * @example
 * async getProfile(@CurrentUser() user: AuthenticatedUser) { ... }
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  },
)
