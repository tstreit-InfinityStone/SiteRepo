import { defineMiddleware } from 'astro:middleware';
import { captureException } from '@/lib/sentry';

export const onRequest = defineMiddleware(async (_context, next) => {
  try {
    return await next();
  } catch (error) {
    captureException(error);
    throw error;
  }
});
