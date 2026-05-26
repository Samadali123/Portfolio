import crypto from 'crypto';

const ITERATIONS = 310000;
const KEY_LENGTH = 32;
const DIGEST = 'sha256';

export const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');

  return `${ITERATIONS}:${salt}:${hash}`;
};

export const verifyPassword = (password: string, storedHash: string) => {
  const [iterations, salt, originalHash] = storedHash.split(':');
  const hash = crypto.pbkdf2Sync(password, salt, Number(iterations), KEY_LENGTH, DIGEST).toString('hex');

  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(originalHash, 'hex'));
};

export const hashToken = (token: string) => crypto.createHash('sha256').update(token).digest('hex');

export const createSecureToken = () => crypto.randomBytes(32).toString('hex');
