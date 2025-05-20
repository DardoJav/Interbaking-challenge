import { Document, Types } from 'mongoose';

export interface ITransfer extends Document {
  importe: number;
  empresa: Types.ObjectId; 
  cuentaDebito: string;
  cuentaCredito: string;
  fecha: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransferInput {
  importe: number;
  empresa: string | Types.ObjectId;
  cuentaDebito: string;
  cuentaCredito: string;
  fecha?: Date;
}