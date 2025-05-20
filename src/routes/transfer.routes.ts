import { Router } from 'express';
import transferController from '../controllers/transfer.controller.js';

const router = Router();

router.get(
  '/companies-last-month',
  transferController.getCompaniesWithTransfersFromLastMonth
);

export default router;