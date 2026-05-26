import { ApiError } from './api';

const attempts = new Map<string, number[]>();

export const formRateLimit = (request: Request, key: string) => {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const ip = forwardedFor || request.headers.get('x-real-ip') || 'unknown';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const bucketKey = `${key}:${ip}`;
  const recent = (attempts.get(bucketKey) || []).filter((timestamp) => now - timestamp < windowMs);

  if (recent.length >= 10) {
    throw new ApiError('Too many form submissions. Please try again later.', 429);
  }

  recent.push(now);
  attempts.set(bucketKey, recent);
};
