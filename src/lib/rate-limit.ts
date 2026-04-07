const submissions = new Map<string, number[]>();

/**
 * Simple in-memory sliding-window rate limiter.
 * Tracks submission timestamps per IP and rejects if the limit is exceeded
 * within the window. Resets on worker restart — sufficient for burst protection.
 */
export function checkRateLimit(
  ip: string,
  { maxRequests = 5, windowMs = 60_000 } = {},
): { allowed: boolean } {
  const now = Date.now();
  const windowStart = now - windowMs;

  const timestamps = (submissions.get(ip) || []).filter((t) => t > windowStart);

  if (timestamps.length >= maxRequests) {
    submissions.set(ip, timestamps);
    return { allowed: false };
  }

  timestamps.push(now);
  submissions.set(ip, timestamps);
  return { allowed: true };
}
