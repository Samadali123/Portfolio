import crypto from 'crypto';
import { env } from './env';

const base64UrlEncode = (value: unknown) => Buffer.from(JSON.stringify(value)).toString('base64url');
const base64UrlDecode = <T>(value: string) => JSON.parse(Buffer.from(value, 'base64url').toString('utf8')) as T;

export const signAuthToken = (payload: Record<string, unknown>, expiresInMs = 24 * 60 * 60 * 1000) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const body = { ...payload, exp: Date.now() + expiresInMs };
  const unsignedToken = `${base64UrlEncode(header)}.${base64UrlEncode(body)}`;
  const signature = crypto.createHmac('sha256', env.jwtSecret).update(unsignedToken).digest('base64url');

  return `${unsignedToken}.${signature}`;
};

export const verifyAuthToken = <T extends { exp: number }>(token: string) => {
  const [header, body, signature] = token.split('.');

  if (!header || !body || !signature) {
    throw new Error('Invalid token.');
  }

  const unsignedToken = `${header}.${body}`;
  const expectedSignature = crypto.createHmac('sha256', env.jwtSecret).update(unsignedToken).digest('base64url');

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    throw new Error('Invalid token.');
  }

  const payload = base64UrlDecode<T>(body);

  if (payload.exp < Date.now()) {
    throw new Error('Token expired.');
  }

  return payload;
};
