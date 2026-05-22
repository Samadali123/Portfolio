import { Router } from 'express';
import { createContact } from '../controllers/contact.controller.js';
import { formRateLimiter } from '../middlewares/rateLimit.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { contactValidator } from '../validators/contact.validator.js';

const router = Router();

router.post('/', formRateLimiter, contactValidator, validate, createContact);

export default router;
