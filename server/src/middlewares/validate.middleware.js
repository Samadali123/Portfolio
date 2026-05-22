import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const error = new Error(errors.array({ onlyFirstError: true })[0].msg);
  error.statusCode = 400;
  return next(error);
};
