import { handleApiError, readJson, successResponse } from '@/server/api';
import { prisma } from '@/server/db';
import { formRateLimit } from '@/server/rateLimit';
import { sendConsultationEmails } from '@/server/mail';
import { validateConsultation } from '@/server/validation';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    formRateLimit(request, 'consultation');
    const body = await readJson(request);
    const data = validateConsultation(body);
    const consultation = await prisma.consultation.create({ data });

    await sendConsultationEmails(consultation);

    return successResponse('Consultation request submitted successfully', { id: consultation.id }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
