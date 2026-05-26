import { NextResponse } from 'next/server';

export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const successResponse = (message: string, data: Record<string, unknown> = {}, statusCode = 200) =>
  NextResponse.json({ success: true, message, data }, { status: statusCode });

export const errorResponse = (message = 'Something went wrong', statusCode = 500) =>
  NextResponse.json({ success: false, message }, { status: statusCode });

export const handleApiError = (error: unknown) => {
  if (error instanceof ApiError) {
    return errorResponse(error.message, error.statusCode);
  }

  if (error instanceof Error && 'statusCode' in error && typeof error.statusCode === 'number') {
    return errorResponse(error.message, error.statusCode);
  }

  const message = error instanceof Error ? error.message : 'Something went wrong';
  return errorResponse(message, 500);
};

export const readJson = async <T = Record<string, unknown>>(request: Request): Promise<T> => {
  try {
    return (await request.json()) as T;
  } catch {
    throw new ApiError('Invalid JSON payload.', 400);
  }
};
