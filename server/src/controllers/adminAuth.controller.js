import { env } from '../config/env.js';
import { prisma } from '../config/db.js';
import { sendAdminPasswordResetEmail } from '../services/mail.service.js';
import { successResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createSecureToken, hashPassword, hashToken, verifyPassword } from '../utils/password.js';
import { signAuthToken } from '../utils/token.js';

const sanitizeAdmin = (admin) => ({
  id: admin.id,
  fullName: admin.fullName,
  email: admin.email,
  role: admin.role,
});

export const registerAdmin = asyncHandler(async (req, res) => {
  const existingAdmin = await prisma.admin.findUnique({ where: { email: req.body.email } });

  if (existingAdmin) {
    const error = new Error('Admin already exists with this email.');
    error.statusCode = 409;
    throw error;
  }

  const admin = await prisma.admin.create({
    data: {
      fullName: req.body.fullName,
      email: req.body.email,
      passwordHash: hashPassword(req.body.password),
    },
  });

  const token = signAuthToken({ sub: admin.id, role: admin.role });

  return successResponse(res, 'Admin registered successfully', { admin: sanitizeAdmin(admin), token }, 201);
});

export const loginAdmin = asyncHandler(async (req, res) => {
  const admin = await prisma.admin.findUnique({ where: { email: req.body.email } });

  if (!admin || !verifyPassword(req.body.password, admin.passwordHash)) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  const updatedAdmin = await prisma.admin.update({
    where: { id: admin.id },
    data: { lastLoginAt: new Date() },
  });

  const token = signAuthToken({ sub: updatedAdmin.id, role: updatedAdmin.role });

  return successResponse(res, 'Login successful', { admin: sanitizeAdmin(updatedAdmin), token });
});

export const getCurrentAdmin = asyncHandler(async (req, res) => {
  return successResponse(res, 'Admin profile fetched successfully', { admin: sanitizeAdmin(req.admin) });
});

export const forgotAdminPassword = asyncHandler(async (req, res) => {
  const admin = await prisma.admin.findUnique({ where: { email: req.body.email } });

  if (admin) {
    const resetToken = createSecureToken();
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        resetPasswordTokenHash: hashToken(resetToken),
        resetPasswordExpiresAt: new Date(Date.now() + 30 * 60 * 1000),
      },
    });

    const resetUrl = `${env.frontendUrl}/admin/reset-password?token=${resetToken}`;
    await sendAdminPasswordResetEmail({ email: admin.email, resetUrl });
  }

  return successResponse(res, 'If an admin account exists, a password reset email has been sent.');
});

export const resetAdminPassword = asyncHandler(async (req, res) => {
  const admin = await prisma.admin.findFirst({
    where: {
      resetPasswordTokenHash: hashToken(req.body.token),
      resetPasswordExpiresAt: { gt: new Date() },
    },
  });

  if (!admin) {
    const error = new Error('Password reset link is invalid or expired.');
    error.statusCode = 400;
    throw error;
  }

  await prisma.admin.update({
    where: { id: admin.id },
    data: {
      passwordHash: hashPassword(req.body.password),
      resetPasswordTokenHash: '',
      resetPasswordExpiresAt: null,
    },
  });

  return successResponse(res, 'Password reset successfully');
});
