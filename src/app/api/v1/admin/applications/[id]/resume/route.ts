import { getCurrentAdmin } from '@/server/auth';
import { ApiError, handleApiError } from '@/server/api';
import { prisma } from '@/server/db';

export const runtime = 'nodejs';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await getCurrentAdmin(request);
    const { id } = await params;
    const application = await prisma.application.findUnique({ where: { id } });

    if (!application) {
      throw new ApiError('Application not found.', 404);
    }

    return new Response(Buffer.from(application.resumeData), {
      headers: {
        'Content-Type': application.resumeMimeType,
        'Content-Disposition': `inline; filename="${application.resumeFileName}"`,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
