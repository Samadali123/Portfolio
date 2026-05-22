import { Router } from 'express';
import {
  getAdminApplications,
  getAdminAppointments,
  getAdminMessages,
  getAdminOverview,
  getApplicationResume,
} from '../controllers/adminDashboard.controller.js';
import { requireAdminAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(requireAdminAuth);
router.get('/overview', getAdminOverview);
router.get('/messages', getAdminMessages);
router.get('/appointments', getAdminAppointments);
router.get('/applications', getAdminApplications);
router.get('/applications/:id/resume', getApplicationResume);

export default router;
