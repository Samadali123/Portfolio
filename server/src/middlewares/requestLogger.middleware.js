import { env } from '../config/env.js';

const fallbackLogger = (req, res, next) => {
  const startedAt = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startedAt;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
  });

  next();
};

export const createRequestLogger = async () => {
  try {
    const { default: morgan } = await import('morgan');
    return morgan(env.nodeEnv === 'production' ? 'combined' : 'dev');
  } catch {
    return fallbackLogger;
  }
};
