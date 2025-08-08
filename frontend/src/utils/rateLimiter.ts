interface RateLimitEntry {
  count: number;
  lastAttempt: number;
  blockedUntil?: number;
}

class RateLimiter {
  private attempts: Map<string, RateLimitEntry> = new Map();
  private maxAttempts: number;
  private windowMs: number;
  private blockDurationMs: number;

  constructor(maxAttempts = 5, windowMs = 60000, blockDurationMs = 300000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.blockDurationMs = blockDurationMs;
  }

  isAllowed(identifier: string): { allowed: boolean; timeUntilReset?: number } {
    const now = Date.now();
    const entry = this.attempts.get(identifier);

    if (!entry) {
      this.attempts.set(identifier, {
        count: 1,
        lastAttempt: now,
      });
      return { allowed: true };
    }

    // Check if user is currently blocked
    if (entry.blockedUntil && now < entry.blockedUntil) {
      return {
        allowed: false,
        timeUntilReset: Math.ceil((entry.blockedUntil - now) / 1000),
      };
    }

    // Reset window if enough time has passed
    if (now - entry.lastAttempt > this.windowMs) {
      entry.count = 1;
      entry.lastAttempt = now;
      entry.blockedUntil = undefined;
      return { allowed: true };
    }

    // Increment counter
    entry.count++;
    entry.lastAttempt = now;

    // Check if limit exceeded
    if (entry.count > this.maxAttempts) {
      entry.blockedUntil = now + this.blockDurationMs;
      return {
        allowed: false,
        timeUntilReset: Math.ceil(this.blockDurationMs / 1000),
      };
    }

    return { allowed: true };
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

// Create instances for different auth methods
export const emailAuthLimiter = new RateLimiter(3, 60000, 300000); 
export const googleAuthLimiter = new RateLimiter(5, 60000, 180000); 
export const signupLimiter = new RateLimiter(2, 300000, 600000); 

export default RateLimiter;
