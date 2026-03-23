import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Request, Response } from 'express';

interface ErrorWithStatus extends Error {
  status?: number;
}

/**
 * Logging Interceptor
 * Logs all incoming requests and outgoing responses
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const { method, url } = request;
    const userAgent = request.get('user-agent') || '';
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;
        const statusCode = response.statusCode;

        this.logger.log(
          `${method} ${url} - ${statusCode} - ${duration}ms - ${userAgent}`,
        );
      }),
      catchError((error: unknown) => {
        const duration = Date.now() - startTime;
        const err = error as ErrorWithStatus;
        const statusCode = err.status || 500;
        const message = err.message || 'Unknown error';

        this.logger.error(
          `${method} ${url} - ${statusCode} - ${duration}ms - ${message}`,
        );

        throw err;
      }),
    );
  }
}
