import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context)
  }

  handleRequest<TUser = any>(
    err: any,
    user: TUser,
    info: any,
    context: ExecutionContext,
  ): TUser {
    if (err || !user) {
      throw err ?? new UnauthorizedException('Authentication required')
    }

    const u = user as any
    if (!u.isAdmin) {
      throw new UnauthorizedException('Admin access required')
    }

    return user
  }
}
