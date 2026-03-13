import { ValidationPipe as NestValidationPipe } from '@nestjs/common';

/**
 * Pre-configured global ValidationPipe.
 * - whitelist: strips unknown props
 * - forbidNonWhitelisted: throws if unknown props present
 * - transform: auto-converts to class instances + primitives
 */
export const GlobalValidationPipe = new NestValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
});
