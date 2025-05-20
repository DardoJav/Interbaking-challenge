import transferRepository from '../repositories/transfer.repository.js';
import companyRepository from '../repositories/company.repository.js';
import { ITransferInput } from '../interfaces/transfer.interface.js';

class TransferService {
  async createTransfer(transferData: ITransferInput) {
    this.validateTransferData(transferData);

    const companyExists = await companyRepository.findOne({ _id: transferData.empresa });
    if (!companyExists) {
      throw new Error('Company not found');
    }

    return transferRepository.create(transferData);
  }

  async getCompaniesWithTransfersFromLastMonth() {
    const companyIds = await transferRepository.findCompaniesWithTransfersFromLastMonth();
    return companyRepository.find({ _id: { $in: companyIds } });
  }

  private validateTransferData(transferData: ITransferInput) {
    if (transferData.importe <= 0) {
      throw new Error('Amount must be greater than zero');
    }

    if (transferData.cuentaDebito === transferData.cuentaCredito) {
      throw new Error('Debit and credit accounts must be different');
    }
  }
}

export default new TransferService();