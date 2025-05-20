import mongoose, { Schema } from 'mongoose';
import { ITransfer } from '../interfaces/transfer.interface.js';

const TransferSchema = new Schema<ITransfer>(
  {
    importe: {
      type: Number,
      required: true,
      min: 0,
    },
    empresa: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    cuentaDebito: {
      type: String,
      required: true,
    },
    cuentaCredito: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
TransferSchema.index({ empresa: 1 });
TransferSchema.index({ fecha: -1 });

const Transfer = mongoose.model<ITransfer>('Transfer', TransferSchema);

export default Transfer;