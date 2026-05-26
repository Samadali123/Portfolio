import { ApiError, handleApiError, readJson, successResponse } from '@/server/api';
import { prisma } from '@/server/db';
import { verifyPassword } from '@/server/password';
import { signAuthToken } from '@/server/token';
import { validateLoginAdmin } from '@/server/validation';

export const runtime = 'nodejs';

const sanitizeAdmin = (admin: any) => ({
  id: admin.id,
  fullName: admin.fullName,
  email: admin.email,
  role: admin.role,
});

export async function POST(request: Request) {
  try {
    const body = await readJson(request);
    const data = validateLoginAdmin(body);
    const admin = await prisma.admin.findUnique({ where: { email: data.email } });

    if (!admin || !verifyPassword(data.password, admin.passwordHash)) {
      throw new ApiError('Invalid email or password.', 401);
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    });

    const token = signAuthToken({ sub: updatedAdmin.id, role: updatedAdmin.role });

    return successResponse('Login successful', { admin: sanitizeAdmin(updatedAdmin), token });
  } catch (error) {
    return handleApiError(error);
  }
}
