import { Router } from 'express';
import {
  forgotAdminPassword,
  getCurrentAdmin,
  loginAdmin,
  registerAdmin,
  resetAdminPassword,
} from '../controllers/adminAuth.controller.js';
import { requireAdminAuth } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  forgotPasswordValidator,
  loginAdminValidator,
  registerAdminValidator,
  resetPasswordValidator,
} from '../validators/adminAuth.validator.js';

const router = Router();

router.post('/register', registerAdminValidator, validate, registerAdmin);
router.post('/login', loginAdminValidator, validate, loginAdmin);
router.get('/me', requireAdminAuth, getCurrentAdmin);
router.post('/forgot-password', forgotPasswordValidator, validate, forgotAdminPassword);
router.post('/reset-password', resetPasswordValidator, validate, resetAdminPassword);

export default router;
