import { Router } from 'express';
import { createConsultation } from '../controllers/consultation.controller.js';
import { formRateLimiter } from '../middlewares/rateLimit.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { consultationValidator } from '../validators/consultation.validator.js';

const router = Router();

router.post('/', formRateLimiter, consultationValidator, validate, createConsultation);

export default router;
