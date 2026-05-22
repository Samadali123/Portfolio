import { body } from 'express-validator';

export const applicationValidator = [
  body('name')
    .trim()
    .escape()
    .isLength({ min: 2, max: 120 })
    .withMessage('Full name must be between 2 and 120 characters.'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail()
    .isLength({ max: 180 })
    .withMessage('Email is too long.'),
  body('college')
    .trim()
    .escape()
    .isLength({ min: 2, max: 180 })
    .withMessage('College or university is required.'),
  body('graduationYear')
    .trim()
    .escape()
    .isLength({ min: 2, max: 20 })
    .withMessage('Graduation year is required.'),
  body('role')
    .trim()
    .escape()
    .isLength({ min: 2, max: 120 })
    .withMessage('Role is required.'),
  body('experience')
    .trim()
    .escape()
    .isLength({ min: 1, max: 80 })
    .withMessage('Experience is required.'),
  body('portfolio')
    .optional({ values: 'falsy' })
    .trim()
    .isURL({ require_protocol: true })
    .withMessage('Portfolio must be a valid URL.'),
  body('github')
    .optional({ values: 'falsy' })
    .trim()
    .isURL({ require_protocol: true })
    .withMessage('GitHub profile must be a valid URL.'),
  body('resume.fileName')
    .trim()
    .escape()
    .isLength({ min: 1, max: 220 })
    .withMessage('Resume file name is required.'),
  body('resume.mimeType')
    .equals('application/pdf')
    .withMessage('Resume must be a PDF file.'),
  body('resume.size')
    .isInt({ min: 1, max: 10 * 1024 * 1024 })
    .withMessage('Resume must be 10MB or smaller.'),
  body('resume.base64')
    .isString()
    .withMessage('Resume content is required.')
    .custom((value) => {
      if (!/^[A-Za-z0-9+/]+={0,2}$/.test(value)) {
        throw new Error('Resume content is invalid.');
      }
      return true;
    }),
];
