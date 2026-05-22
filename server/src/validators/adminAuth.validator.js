import { body } from 'express-validator';

export const registerAdminValidator = [
  body('fullName').trim().escape().isLength({ min: 2, max: 120 }).withMessage('Full name must be between 2 and 120 characters.'),
  body('email').trim().isEmail().withMessage('Please provide a valid email address.').normalizeEmail(),
  body('password').isLength({ min: 8, max: 128 }).withMessage('Password must be at least 8 characters.'),
];

export const loginAdminValidator = [
  body('email').trim().isEmail().withMessage('Please provide a valid email address.').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required.'),
];

export const forgotPasswordValidator = [
  body('email').trim().isEmail().withMessage('Please provide a valid email address.').normalizeEmail(),
];

export const resetPasswordValidator = [
  body('token').trim().notEmpty().withMessage('Reset token is required.'),
  body('password').isLength({ min: 8, max: 128 }).withMessage('Password must be at least 8 characters.'),
];
