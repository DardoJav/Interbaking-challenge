import { Router } from 'express';
import companyRoutes from './company.routes.js';
import transferRoutes from './transfer.routes.js';
import { authenticate } from '../middleware/auth.middleware.js';
import authRoutes from './auth.routes.js';

const router = Router();

router.use('/companies', companyRoutes);
router.use('/transfers', authenticate, transferRoutes);
router.use('/auth', authRoutes);

export default router;