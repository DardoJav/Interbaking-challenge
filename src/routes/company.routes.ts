import { Router } from 'express';
import { body } from 'express-validator';
import companyController from '../controllers/company.controller.js';
import { validate } from '../middleware/validation.middleware.js';
import { CUIT_REGEX, RAZON_SOCIAL_REGEX } from '../utils/constants.js';

const router = Router();

router.post(
  '/',
  [
    body('cuit').matches(CUIT_REGEX).withMessage('Invalid CUIT format'),
    body('razonSocial')
      .matches(RAZON_SOCIAL_REGEX)
      .withMessage('Invalid business name'),
    validate,
  ],
  companyController.createCompany
);

router.get(
  '/last-month',
  companyController.getCompaniesFromLastMonth
);

export default router;