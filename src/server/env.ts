import dotenv from 'dotenv';

dotenv.config();

const requiredEnv = [
  'DATABASE_URL',
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
  databaseUrl: process.env.DATABASE_URL || '',
  jwtSecret: process.env.JWT_SECRET || 'development-only-change-this-secret',
  mail: {
    host: process.env.MAIL_HOST || '',
    port: Number(process.env.MAIL_PORT),
    secure: Number(process.env.MAIL_PORT) === 465,
    user: process.env.MAIL_USER || '',
    pass: process.env.MAIL_PASS || '',
  },
  companyEmail: process.env.COMPANY_EMAIL || '',
  googleApiKey: process.env.GOOGLE_API_KEY,
  googleChatModel: process.env.GEMINI_MODEL || 'gemini-3.5-flash',
  googleEmbeddingModel: process.env.GEMINI_EMBEDDING_MODEL || 'embedding-001',
};
