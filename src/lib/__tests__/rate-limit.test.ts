import { describe, it, expect } from 'vitest';
import { checkRateLimit } from '../rate-limit';

describe('checkRateLimit', () => {
  it('allows requests under the limit', () => {
    const ip = 'test-allow-' + Date.now();
    expect(checkRateLimit(ip, { maxRequests: 3, windowMs: 60_000 }).allowed).toBe(true);
    expect(checkRateLimit(ip, { maxRequests: 3, windowMs: 60_000 }).allowed).toBe(true);
    expect(checkRateLimit(ip, { maxRequests: 3, windowMs: 60_000 }).allowed).toBe(true);
  });

  it('blocks requests over the limit', () => {
    const ip = 'test-block-' + Date.now();
    for (let i = 0; i < 5; i++) {
      checkRateLimit(ip, { maxRequests: 5, windowMs: 60_000 });
    }
    expect(checkRateLimit(ip, { maxRequests: 5, windowMs: 60_000 }).allowed).toBe(false);
  });

  it('tracks IPs independently', () => {
    const ip1 = 'test-ip1-' + Date.now();
    const ip2 = 'test-ip2-' + Date.now();

    for (let i = 0; i < 5; i++) {
      checkRateLimit(ip1, { maxRequests: 5, windowMs: 60_000 });
    }

    expect(checkRateLimit(ip1, { maxRequests: 5, windowMs: 60_000 }).allowed).toBe(false);
    expect(checkRateLimit(ip2, { maxRequests: 5, windowMs: 60_000 }).allowed).toBe(true);
  });
});
