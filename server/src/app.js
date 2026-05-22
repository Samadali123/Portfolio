import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import { errorMiddleware, notFound } from './middlewares/error.middleware.js';
import { createRequestLogger } from './middlewares/requestLogger.middleware.js';
import adminAuthRoutes from './routes/adminAuth.routes.js';
import adminDashboardRoutes from './routes/adminDashboard.routes.js';
import applicationRoutes from './routes/application.routes.js';
import consultationRoutes from './routes/consultation.routes.js';
import contactRoutes from './routes/contact.routes.js';
import { successResponse } from './utils/apiResponse.js';

const app = express();

app.use(helmet());
app.use(await createRequestLogger());
app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

app.get('/api/v1/health', (req, res) => {
  return successResponse(res, 'Backend is healthy', {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/consultation', consultationRoutes);
app.use('/api/v1/applications', applicationRoutes);
app.use('/api/v1/admin/auth', adminAuthRoutes);
app.use('/api/v1/admin', adminDashboardRoutes);

app.use(notFound);
app.use(errorMiddleware);

export default app;
