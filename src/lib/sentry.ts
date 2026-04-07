export async function captureException(error: unknown) {
  if (!import.meta.env.SENTRY_DSN) return;
  const { captureException: capture } = await import('@sentry/cloudflare');
  capture(error);
}
