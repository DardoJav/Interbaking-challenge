import { Request, Response, NextFunction } from 'express';
import companyService from '../services/company.service.js';
import { ICompanyInput } from '../interfaces/company.interface.js';
import logger from '../utils/logger.js';
import { validationResult } from 'express-validator';

class CompanyController {
  async createCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const companyData: ICompanyInput = req.body;
      const company = await companyService.createCompany(companyData);
      res.status(201).json(company);
    } catch (error) {
      logger.error('Error creating company:', error);
      next(error);
    }
  }

  async getCompaniesFromLastMonth(req: Request, res: Response, next: NextFunction) {
    try {
      const companies = await companyService.getCompaniesFromLastMonth();
      res.json(companies);
    } catch (error) {
      logger.error('Error getting companies from last month:', error);
      next(error);
    }
  }
}

export default new CompanyController();