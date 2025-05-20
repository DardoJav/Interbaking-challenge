import Company from '../models/company.model.js';
import { ICompany, ICompanyInput } from '../interfaces/company.interface.js';
import { ICompanyRepository } from '../interfaces/repository.interface.js';
import logger from '../utils/logger.js';
import { FilterQuery, UpdateQuery } from 'mongoose';

class CompanyRepository implements ICompanyRepository {
  async create(data: ICompanyInput): Promise<ICompany> {
    try {
      const company = await Company.create(data);
      return company.toObject();
    } catch (error) {
      logger.error('Error creating company:', error);
      throw error;
    }
  }

  async findOne(query: FilterQuery<ICompany>): Promise<ICompany | null> {
    return Company.findOne(query).lean();
  }

  async find(query: FilterQuery<ICompany> = {}): Promise<ICompany[]> {
    return Company.find(query).lean();
  }

  async update(query: FilterQuery<ICompany>, data: UpdateQuery<ICompany>): Promise<ICompany | null> {
    return Company.findOneAndUpdate(query, data, { new: true }).lean();
  }

  async delete(query: FilterQuery<ICompany>): Promise<boolean> {
    const result = await Company.deleteOne(query);
    return result.deletedCount > 0;
  }

  async findCompaniesFromLastMonth(): Promise<ICompany[]> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return Company.find({
      fechaAdhesion: { $gte: oneMonthAgo },
    }).lean();
  }

  async existsByCuit(cuit: string): Promise<boolean> {
    const count = await Company.countDocuments({ cuit });
    return count > 0;
  }
}

export default new CompanyRepository();