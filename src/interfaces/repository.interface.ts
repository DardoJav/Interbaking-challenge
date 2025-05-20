import { Document, FilterQuery, UpdateQuery } from 'mongoose';
import { ICompany, ICompanyInput } from './company.interface.js';
import { ITransfer, ITransferInput } from './transfer.interface.js';

export interface IRepository<T extends Document, U> {
  create(data: U): Promise<T>;
  findOne(query: FilterQuery<T>): Promise<T | null>;
  find(query: FilterQuery<T>): Promise<T[]>;
  update(query: FilterQuery<T>, data: UpdateQuery<T>): Promise<T | null>;
  delete(query: FilterQuery<T>): Promise<boolean>;
}

export interface ICompanyRepository extends IRepository<ICompany, ICompanyInput> {
  findCompaniesFromLastMonth(): Promise<ICompany[]>;
  existsByCuit(cuit: string): Promise<boolean>;
}

export interface ITransferRepository extends IRepository<ITransfer, ITransferInput> {
  findTransfersFromLastMonth(): Promise<ITransfer[]>;
  findCompaniesWithTransfersFromLastMonth(): Promise<string[]>;
}