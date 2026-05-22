import dotenv from 'dotenv';

dotenv.config();

const requiredEnv = [
  'DATABASE_URL',
  'FRONTEND_URL',
  'MAIL_HOST',
  'MAIL_PORT',
  'MAIL_USER',
  'MAIL_PASS',
  'COMPANY_EMAIL',
];

const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnv.join(', ')}`);
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  databaseUrl: process.env.DATABASE_URL,
  frontendUrl: process.env.FRONTEND_URL,
  jwtSecret: process.env.JWT_SECRET || 'development-only-change-this-secret',
  mail: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: Number(process.env.MAIL_PORT) === 465,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  companyEmail: process.env.COMPANY_EMAIL,
};
