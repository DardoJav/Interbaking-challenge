import { Request, Response, NextFunction } from 'express';
import transferService from '../services/transfer.service.js';
import logger from '../utils/logger.js';

class TransferController {
  async getCompaniesWithTransfersFromLastMonth(req: Request, res: Response, next: NextFunction) {
    try {
      const companies = await transferService.getCompaniesWithTransfersFromLastMonth();
      res.json(companies);
    } catch (error) {
      logger.error('Error getting companies with transfers:', error);
      next(error);
    }
  }
}

export default new TransferController();