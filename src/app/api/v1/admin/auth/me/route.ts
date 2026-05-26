import { getCurrentAdmin } from '@/server/auth';
import { handleApiError, successResponse } from '@/server/api';

export const runtime = 'nodejs';

const sanitizeAdmin = (admin: any) => ({
  id: admin.id,
  fullName: admin.fullName,
  email: admin.email,
  role: admin.role,
});

export async function GET(request: Request) {
  try {
    const admin = await getCurrentAdmin(request);
    return successResponse('Admin profile fetched successfully', { admin: sanitizeAdmin(admin) });
  } catch (error) {
    return handleApiError(error);
  }
}
