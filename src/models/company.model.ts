import mongoose, { Schema } from 'mongoose';
import { ICompany } from '../interfaces/company.interface.js';
import { CUIT_REGEX, RAZON_SOCIAL_REGEX } from '../utils/constants.js';

const CompanySchema = new Schema<ICompany>(
  {
    cuit: {
      type: String,
      required: true,
      unique: true,
      match: [CUIT_REGEX, 'Please provide a valid CUIT'],
    },
    razonSocial: {
      type: String,
      required: true,
      match: [RAZON_SOCIAL_REGEX, 'Please provide a valid business name'],
    },
    fechaAdhesion: {
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
CompanySchema.index({ cuit: 1 }, { unique: true });
CompanySchema.index({ fechaAdhesion: -1 });

const Company = mongoose.model<ICompany>('Company', CompanySchema);

export default Company;