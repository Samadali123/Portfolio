import { body } from 'express-validator';

export const consultationValidator = [
  body('service')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 2, max: 120 })
    .withMessage('Service must be between 2 and 120 characters.'),
  body('serviceInterestedIn')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 2, max: 120 })
    .withMessage('Service must be between 2 and 120 characters.'),
  body('date')
    .optional()
    .trim()
    .isISO8601({ strict: true })
    .withMessage('Preferred date must be a valid date.'),
  body('preferredDate')
    .optional()
    .trim()
    .isISO8601({ strict: true })
    .withMessage('Preferred date must be a valid date.'),
  body('time')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 2, max: 40 })
    .withMessage('Preferred time must be provided.'),
  body('preferredTime')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 2, max: 40 })
    .withMessage('Preferred time must be provided.'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail()
    .isLength({ max: 180 })
    .withMessage('Email is too long.'),
  body('fullName')
    .optional({ values: 'falsy' })
    .trim()
    .escape()
    .isLength({ max: 120 })
    .withMessage('Full name is too long.'),
  body('phone')
    .optional({ values: 'falsy' })
    .trim()
    .escape()
    .isLength({ max: 40 })
    .withMessage('Phone number is too long.'),
  body('projectDescription')
    .optional({ values: 'falsy' })
    .trim()
    .escape()
    .isLength({ max: 3000 })
    .withMessage('Project description is too long.'),
  body().custom((value) => {
    if (!value.service && !value.serviceInterestedIn) {
      throw new Error('Service is required.');
    }
    if (!value.date && !value.preferredDate) {
      throw new Error('Preferred date is required.');
    }
    if (!value.time && !value.preferredTime) {
      throw new Error('Preferred time is required.');
    }
    return true;
  }),
];
