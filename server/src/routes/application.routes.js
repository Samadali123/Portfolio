import { Router } from 'express';
import { createApplication } from '../controllers/application.controller.js';
import { formRateLimiter } from '../middlewares/rateLimit.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { applicationValidator } from '../validators/application.validator.js';

const router = Router();

router.post('/', formRateLimiter, applicationValidator, validate, createApplication);

export default router;
