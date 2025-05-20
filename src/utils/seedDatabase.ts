import path , { dirname } from 'path';
import fs from 'fs';
import companyRepository from '../repositories/company.repository.js';
import transferRepository from '../repositories/transfer.repository.js';
import logger from './logger.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const seedDatabase = async () => {
  try {
    // Check if data already exists
    const existingCompanies = await companyRepository.find();
    if (existingCompanies.length > 0) {
      logger.info('Database already seeded. Skipping...');
      return;
    }

    // Load mock data
    const companiesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../../mocks/companies.json'), 'utf-8')
    );

    const transfersData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../../mocks/transfers.json'), 'utf-8')
    );

    logger.info('Database seeded successfully!');
  } catch (error) {
    logger.error('Error seeding database:', error);
  }
};

export default seedDatabase;