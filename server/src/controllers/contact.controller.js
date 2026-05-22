import { prisma } from '../config/db.js';
import { sendContactEmails } from '../services/mail.service.js';
import { successResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createContact = asyncHandler(async (req, res) => {
  const contact = await prisma.contact.create({
    data: {
      fullName: req.body.fullName || req.body.name,
      email: req.body.email,
      phone: req.body.phone || '',
      companyName: req.body.companyName || '',
      message: req.body.message,
    },
  });

  await sendContactEmails(contact);

  return successResponse(res, 'Contact form submitted successfully', { id: contact.id }, 201);
});
