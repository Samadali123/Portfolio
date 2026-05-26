import { prisma } from './db';
import { ApiError } from './api';
import { verifyAuthToken } from './token';

type AuthPayload = {
  sub: string;
  role: string;
  exp: number;
};

export const getCurrentAdmin = async (request: Request) => {
  try {
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

    if (!token) {
      throw new Error('Missing token');
    }

    const payload = verifyAuthToken<AuthPayload>(token);
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
      throw new Error('Missing admin');
    }

    return admin;
  } catch {
    throw new ApiError('Authentication required.', 401);
  }
};
