import { getCurrentAdmin } from '@/server/auth';
import { handleApiError, successResponse } from '@/server/api';
import { getOverview } from '@/server/dashboard';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    await getCurrentAdmin(request);
    const { searchParams } = new URL(request.url);
    const overview = await getOverview(searchParams.get('range'));

    return successResponse('Dashboard overview fetched successfully', overview);
  } catch (error) {
    return handleApiError(error);
  }
}
