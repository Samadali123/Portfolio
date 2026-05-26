import { handleApiError, readJson, successResponse } from '@/server/api';
import { prisma } from '@/server/db';
import { createSecureToken, hashToken } from '@/server/password';
import { sendAdminPasswordResetEmail } from '@/server/mail';
import { validateForgotPassword } from '@/server/validation';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await readJson(request);
    const data = validateForgotPassword(body);
    const admin = await prisma.admin.findUnique({ where: { email: data.email } });

    if (admin) {
      const resetToken = createSecureToken();
      await prisma.admin.update({
        where: { id: admin.id },
        data: {
          resetPasswordTokenHash: hashToken(resetToken),
          resetPasswordExpiresAt: new Date(Date.now() + 30 * 60 * 1000),
        },
      });

      const resetUrl = `${new URL(request.url).origin}/admin/reset-password?token=${resetToken}`;
      await sendAdminPasswordResetEmail({ email: admin.email, resetUrl });
    }

    return successResponse('If an admin account exists, a password reset email has been sent.');
  } catch (error) {
    return handleApiError(error);
  }
}
