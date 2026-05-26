import { getCurrentAdmin } from '@/server/auth';
import { handleApiError, successResponse } from '@/server/api';
import { prisma } from '@/server/db';
import { applicationListSelect, getDateRange, getDateWhere, toApiApplication } from '@/server/dashboard';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    await getCurrentAdmin(request);
    const { searchParams } = new URL(request.url);
    const range = getDateRange(searchParams.get('range'));
    const applications = await prisma.application.findMany({
      where: getDateWhere(range.start, range.end),
      select: applicationListSelect,
      orderBy: { createdAt: 'desc' },
    });

    return successResponse('Applications fetched successfully', {
      applications: applications.map(toApiApplication),
    });
  } catch (error) {
    return handleApiError(error);
  }
}
