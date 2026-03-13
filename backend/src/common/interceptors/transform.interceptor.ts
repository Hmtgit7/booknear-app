import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

/**
 * TransformInterceptor — Wraps all successful responses in a standard envelope.
 *
 * Every successful response becomes:
 * {
 *   success: true,
 *   statusCode: 200,
 *   message: "...",
 *   data: { ... },
 *   timestamp: "..."
 * }
 *
 * Controllers can return { message, data } or just data.
 * If the response already has a `message` field it is used, otherwise
 * a generic "Success" message is applied.
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor<unknown, ApiResponse<unknown>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<unknown>> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data: unknown) => {
        const dataObject =
          data && typeof data === 'object' ? (data as Record<string, unknown>) : null;

        // Allow controllers to pass { message, data } for custom messages
        const message =
          dataObject && typeof dataObject.message === 'string' ? dataObject.message : 'Success';

        const payload = dataObject && 'data' in dataObject ? dataObject.data : data;

        return {
          success: true,
          statusCode: response.statusCode,
          message,
          data: payload ?? null,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
