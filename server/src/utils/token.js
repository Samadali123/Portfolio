import crypto from 'crypto';
import { env } from '../config/env.js';

const base64UrlEncode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
const base64UrlDecode = (value) => JSON.parse(Buffer.from(value, 'base64url').toString('utf8'));

export const signAuthToken = (payload, expiresInMs = 24 * 60 * 60 * 1000) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const body = { ...payload, exp: Date.now() + expiresInMs };
  const unsignedToken = `${base64UrlEncode(header)}.${base64UrlEncode(body)}`;
  const signature = crypto.createHmac('sha256', env.jwtSecret).update(unsignedToken).digest('base64url');

  return `${unsignedToken}.${signature}`;
};

export const verifyAuthToken = (token) => {
  const [header, body, signature] = token.split('.');

  if (!header || !body || !signature) {
    throw new Error('Invalid token.');
  }

  const unsignedToken = `${header}.${body}`;
  const expectedSignature = crypto.createHmac('sha256', env.jwtSecret).update(unsignedToken).digest('base64url');

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    throw new Error('Invalid token.');
  }

  const payload = base64UrlDecode(body);

  if (payload.exp < Date.now()) {
    throw new Error('Token expired.');
  }

  return payload;
};
