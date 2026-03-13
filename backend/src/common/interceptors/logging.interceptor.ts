import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * LoggingInterceptor — Logs method, URL, status, request-id, and response time.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<{
      headers: Record<string, string | string[] | undefined>;
      method: string;
      url: string;
    }>();
    const response = context.switchToHttp().getResponse<{ statusCode: number }>();
    const { method, url } = request;
    const requestId =
      typeof request.headers['x-request-id'] === 'string' ? request.headers['x-request-id'] : 'n/a';
    const isProd = process.env.NODE_ENV === 'production';
    const start = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const ms = Date.now() - start;
          const statusCode = response.statusCode;
          const line = `${method} ${url} ${statusCode} - ${ms}ms`;
          const payload = {
            level: statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info',
            method,
            url,
            statusCode,
            durationMs: ms,
            requestId,
          };
          const output = isProd ? JSON.stringify(payload) : `${line} [rid=${requestId}]`;

          if (statusCode >= 500) {
            this.logger.error(output);
            return;
          }
          if (statusCode >= 400) {
            this.logger.warn(output);
            return;
          }

          this.logger.log(output);
        },
        error: (error: unknown) => {
          const ms = Date.now() - start;
          const statusCode = response.statusCode;
          const payload = {
            level: 'error',
            method,
            url,
            statusCode,
            durationMs: ms,
            requestId,
          };
          const output = isProd
            ? JSON.stringify(payload)
            : `${method} ${url} ${statusCode} - ${ms}ms [rid=${requestId}]`;
          this.logger.error(output, error instanceof Error ? error.stack : undefined);
        },
      }),
    );
  }
}
