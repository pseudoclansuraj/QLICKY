interface RetryOptions {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
}

export class AuthRetryService {
  private static defaultOptions: RetryOptions = {
    maxRetries: 3,
    baseDelay: 1000,
    maxDelay: 10000,
  };

  static async withRetry<T>(
    operation: () => Promise<T>,
    options: Partial<RetryOptions> = {}
  ): Promise<T> {
    const opts = { ...this.defaultOptions, ...options };
    let lastError: Error;

    for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error: any) {
        lastError = error;

        // Don't retry for certain error codes
        if (this.shouldNotRetry(error.code)) {
          throw error;
        }

        // Don't retry on last attempt
        if (attempt === opts.maxRetries) {
          break;
        }

        const delay = Math.min(
          opts.baseDelay * Math.pow(2, attempt),
          opts.maxDelay
        );

        console.log(`Auth operation failed (attempt ${attempt + 1}), retrying in ${delay}ms...`);
        await this.delay(delay);
      }
    }

    throw lastError!;
  }

  private static shouldNotRetry(errorCode: string): boolean {
    const nonRetryableErrors = [
      'auth/user-not-found',
      'auth/wrong-password',
      'auth/user-disabled',
      'auth/email-already-in-use',
      'auth/weak-password',
      'auth/invalid-email',
      'auth/quota-exceeded', 
      'auth/invalid-action-code',
      'auth/expired-action-code',
    ];

    return nonRetryableErrors.includes(errorCode);
  }

  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
