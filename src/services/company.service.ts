import companyRepository from '../repositories/company.repository.js';
import { ICompanyInput } from '../interfaces/company.interface.js';
import logger from '../utils/logger.js';
import { CUIT_REGEX, RAZON_SOCIAL_REGEX } from '../utils/constants.js';

class CompanyService {
  async createCompany(companyData: ICompanyInput) {
    this.validateCompanyData(companyData);

    const exists = await companyRepository.existsByCuit(companyData.cuit);
    if (exists) {
      throw new Error('Company with this CUIT already exists');
    }

    return companyRepository.create(companyData);
  }

  async getCompaniesFromLastMonth() {
    return companyRepository.findCompaniesFromLastMonth();
  }

  private validateCompanyData(companyData: ICompanyInput) {
    if (!CUIT_REGEX.test(companyData.cuit)) {
      throw new Error('Invalid CUIT format');
    }

    if (!RAZON_SOCIAL_REGEX.test(companyData.razonSocial)) {
      throw new Error('Invalid business name');
    }
  }
}

export default new CompanyService();