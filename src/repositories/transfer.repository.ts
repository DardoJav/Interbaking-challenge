import Transfer from '../models/transfer.model.js';
import { ITransfer, ITransferInput } from '../interfaces/transfer.interface.js';
import { ITransferRepository } from '../interfaces/repository.interface.js';
import logger from '../utils/logger.js';
import { FilterQuery, UpdateQuery } from 'mongoose';

class TransferRepository implements ITransferRepository {
  async create(data: ITransferInput): Promise<ITransfer> {
    try {
      const transfer = await Transfer.create(data);
      return transfer.toObject();
    } catch (error) {
      logger.error('Error creating transfer:', error);
      throw error;
    }
  }

  async findOne(query: FilterQuery<ITransfer>): Promise<ITransfer | null> {
    return Transfer.findOne(query).lean();
  }

  async find(query: FilterQuery<ITransfer> = {}): Promise<ITransfer[]> {
    return Transfer.find(query).lean();
  }

  async update(query: FilterQuery<ITransfer>, data: UpdateQuery<ITransfer>): Promise<ITransfer | null> {
    return Transfer.findOneAndUpdate(query, data, { new: true }).lean();
  }

  async delete(query: FilterQuery<ITransfer>): Promise<boolean> {
    const result = await Transfer.deleteOne(query);
    return result.deletedCount > 0;
  }

  async findTransfersFromLastMonth(): Promise<ITransfer[]> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return Transfer.find({
      fecha: { $gte: oneMonthAgo },
    }).lean();
  }

  async findCompaniesWithTransfersFromLastMonth(): Promise<string[]> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const result = await Transfer.aggregate([
      {
        $match: {
          fecha: { $gte: oneMonthAgo },
        },
      },
      {
        $group: {
          _id: '$empresa',
        },
      },
    ]);

    return result.map((item) => item._id.toString());
  }
}

export default new TransferRepository();