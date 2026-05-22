import { prisma } from '../config/db.js';
import { sendConsultationEmails } from '../services/mail.service.js';
import { successResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createConsultation = asyncHandler(async (req, res) => {
  const consultation = await prisma.consultation.create({
    data: {
      fullName: req.body.fullName || '',
      email: req.body.email,
      phone: req.body.phone || '',
      serviceInterestedIn: req.body.serviceInterestedIn || req.body.service,
      preferredDate: req.body.preferredDate || req.body.date,
      preferredTime: req.body.preferredTime || req.body.time,
      projectDescription: req.body.projectDescription || '',
    },
  });

  await sendConsultationEmails(consultation);

  return successResponse(res, 'Consultation request submitted successfully', { id: consultation.id }, 201);
});
