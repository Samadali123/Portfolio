import { body } from 'express-validator';

export const contactValidator = [
  body('name')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 2, max: 120 })
    .withMessage('Name must be between 2 and 120 characters.'),
  body('fullName')
    .optional()
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
  body('phone')
    .optional({ values: 'falsy' })
    .trim()
    .escape()
    .isLength({ max: 40 })
    .withMessage('Phone number is too long.'),
  body('companyName')
    .optional({ values: 'falsy' })
    .trim()
    .escape()
    .isLength({ max: 160 })
    .withMessage('Company name is too long.'),
  body('message')
    .trim()
    .escape()
    .isLength({ min: 10, max: 3000 })
    .withMessage('Message must be between 10 and 3000 characters.'),
  body().custom((value) => {
    if (!value.name && !value.fullName) {
      throw new Error('Name is required.');
    }
    return true;
  }),
];
