import { prisma } from '../config/db.js';
import { sendApplicationEmails } from '../services/mail.service.js';
import { successResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const withResume = (application) => ({
  ...application,
  resume: {
    fileName: application.resumeFileName,
    mimeType: application.resumeMimeType,
    size: application.resumeSize,
    data: application.resumeData,
  },
});

export const createApplication = asyncHandler(async (req, res) => {
  const resumeBuffer = Buffer.from(req.body.resume.base64, 'base64');

  const application = await prisma.application.create({
    data: {
      fullName: req.body.name,
      email: req.body.email,
      college: req.body.college,
      graduationYear: req.body.graduationYear,
      role: req.body.role,
      experience: req.body.experience,
      portfolio: req.body.portfolio || '',
      github: req.body.github || '',
      resumeFileName: req.body.resume.fileName,
      resumeMimeType: req.body.resume.mimeType,
      resumeSize: Number(req.body.resume.size),
      resumeData: resumeBuffer,
    },
  });

  await sendApplicationEmails(withResume(application));

  return successResponse(res, 'Application submitted successfully', { id: application.id }, 201);
});
