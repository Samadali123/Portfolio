import { handleApiError, readJson, successResponse } from '@/server/api';
import { prisma } from '@/server/db';
import { formRateLimit } from '@/server/rateLimit';
import { sendContactEmails } from '@/server/mail';
import { validateContact } from '@/server/validation';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    formRateLimit(request, 'contact');
    const body = await readJson(request);
    const data = validateContact(body);
    const contact = await prisma.contact.create({ data });

    await sendContactEmails(contact);

    return successResponse('Contact form submitted successfully', { id: contact.id }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
