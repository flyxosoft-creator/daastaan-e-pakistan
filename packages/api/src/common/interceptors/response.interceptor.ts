import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface PaginatedResult<T> {
  items: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface ApiResponse<T> {
  data: T
  meta: PaginatedResult<T>['meta'] | null
  error: null
}

function isPaginatedResult<T>(value: unknown): value is PaginatedResult<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'items' in value &&
    'meta' in value &&
    Array.isArray((value as PaginatedResult<T>).items)
  )
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T | T[]>>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T | T[]>> {
    return next.handle().pipe(
      map((data: unknown) => {
        if (isPaginatedResult<T>(data)) {
          return {
            data: data.items,
            meta: data.meta,
            error: null,
          } as ApiResponse<T[]>
        }

        return {
          data: data as T,
          meta: null,
          error: null,
        }
      }),
    )
  }
}
