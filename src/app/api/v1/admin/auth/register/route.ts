import { ApiError, handleApiError, readJson, successResponse } from '@/server/api';
import { prisma } from '@/server/db';
import { hashPassword } from '@/server/password';
import { signAuthToken } from '@/server/token';
import { validateRegisterAdmin } from '@/server/validation';

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
    const data = validateRegisterAdmin(body);
    const existingAdmin = await prisma.admin.findUnique({ where: { email: data.email } });

    if (existingAdmin) {
      throw new ApiError('Admin already exists with this email.', 409);
    }

    const admin = await prisma.admin.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        passwordHash: hashPassword(data.password),
      },
    });

    const token = signAuthToken({ sub: admin.id, role: admin.role });

    return successResponse('Admin registered successfully', { admin: sanitizeAdmin(admin), token }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
