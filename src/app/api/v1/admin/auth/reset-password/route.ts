import { ApiError, handleApiError, readJson, successResponse } from '@/server/api';
import { prisma } from '@/server/db';
import { hashPassword, hashToken } from '@/server/password';
import { validateResetPassword } from '@/server/validation';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await readJson(request);
    const data = validateResetPassword(body);
    const admin = await prisma.admin.findFirst({
      where: {
        resetPasswordTokenHash: hashToken(data.token),
        resetPasswordExpiresAt: { gt: new Date() },
      },
    });

    if (!admin) {
      throw new ApiError('Password reset link is invalid or expired.', 400);
    }

    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        passwordHash: hashPassword(data.password),
        resetPasswordTokenHash: '',
        resetPasswordExpiresAt: null,
      },
    });

    return successResponse('Password reset successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
