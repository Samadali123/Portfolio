import { errorResponse } from '../utils/apiResponse.js';

export const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

export const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? 'Something went wrong' : error.message;

  if (statusCode === 500) {
    console.error(error);
  }

  return errorResponse(res, message, statusCode);
};
