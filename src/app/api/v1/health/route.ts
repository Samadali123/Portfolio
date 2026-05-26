import { successResponse } from '@/server/api';

export const runtime = 'nodejs';

export async function GET() {
  return successResponse('Backend is healthy', {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
}
