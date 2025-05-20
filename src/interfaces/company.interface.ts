import { Document } from 'mongoose';

export interface ICompany extends Document {
  cuit: string;
  razonSocial: string;
  fechaAdhesion: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICompanyInput {
  cuit: string;
  razonSocial: string;
  fechaAdhesion?: Date;
}