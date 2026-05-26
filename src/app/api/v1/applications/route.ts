import { handleApiError, readJson, successResponse } from '@/server/api';
import { prisma } from '@/server/db';
import { formRateLimit } from '@/server/rateLimit';
import { sendApplicationEmails } from '@/server/mail';
import { validateApplication } from '@/server/validation';

export const runtime = 'nodejs';

const withResume = (application: any) => ({
  ...application,
  resume: {
    fileName: application.resumeFileName,
    mimeType: application.resumeMimeType,
    size: application.resumeSize,
    data: application.resumeData,
  },
});

export async function POST(request: Request) {
  try {
    formRateLimit(request, 'applications');
    const body = await readJson(request);
    const data = validateApplication(body);
    const resumeBuffer = Buffer.from(data.resume.base64, 'base64');

    const application = await prisma.application.create({
      data: {
        fullName: data.name,
        email: data.email,
        college: data.college,
        graduationYear: data.graduationYear,
        role: data.role,
        experience: data.experience,
        portfolio: data.portfolio,
        github: data.github,
        resumeFileName: data.resume.fileName,
        resumeMimeType: data.resume.mimeType,
        resumeSize: Number(data.resume.size),
        resumeData: resumeBuffer,
      },
    });

    await sendApplicationEmails(withResume(application));

    return successResponse('Application submitted successfully', { id: application.id }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
