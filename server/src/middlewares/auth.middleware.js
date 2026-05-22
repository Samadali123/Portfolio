import { prisma } from '../config/db.js';
import { verifyAuthToken } from '../utils/token.js';

export const requireAdminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

    if (!token) {
      const error = new Error('Authentication required.');
      error.statusCode = 401;
      return next(error);
    }

    const payload = verifyAuthToken(token);
    const admin = await prisma.admin.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        resetPasswordExpiresAt: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!admin) {
      const error = new Error('Authentication required.');
      error.statusCode = 401;
      return next(error);
    }

    req.admin = admin;
    return next();
  } catch {
    const error = new Error('Authentication required.');
    error.statusCode = 401;
    return next(error);
  }
};
