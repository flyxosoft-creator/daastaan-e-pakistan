import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Request, Response } from 'express'

interface ErrorResponse {
  data: null
  error: {
    statusCode: number
    message: string | string[]
    errors: string[]
  }
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name)

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR
    let message: string | string[] = 'Internal server error'
    let errors: string[] = []

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus()
      const exceptionResponse = exception.getResponse()

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const resp = exceptionResponse as Record<string, any>
        message = resp['message'] ?? message
        if (Array.isArray(resp['errors'])) {
          errors = resp['errors'] as string[]
        } else if (Array.isArray(message)) {
          // class-validator produces array of constraint messages
          errors = message as string[]
          message = 'Validation failed'
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message || 'Internal server error'
    }

    // Log 5xx errors with stack trace
    if (statusCode >= 500) {
      this.logger.error(
        `[${request.method}] ${request.url} → ${statusCode}`,
        exception instanceof Error ? exception.stack : String(exception),
      )
    }

    const errorBody: ErrorResponse = {
      data: null,
      error: {
        statusCode,
        message,
        errors,
      },
    }

    response.status(statusCode).json(errorBody)
  }
}
