import { getCurrentAdmin } from '@/server/auth';
import { handleApiError, successResponse } from '@/server/api';
import { prisma } from '@/server/db';
import { getDateRange, getDateWhere, toApiRecord } from '@/server/dashboard';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    await getCurrentAdmin(request);
    const { searchParams } = new URL(request.url);
    const range = getDateRange(searchParams.get('range'));
    const appointments = await prisma.consultation.findMany({
      where: getDateWhere(range.start, range.end),
      orderBy: { createdAt: 'desc' },
    });

    return successResponse('Appointments fetched successfully', { appointments: appointments.map(toApiRecord) });
  } catch (error) {
    return handleApiError(error);
  }
}
