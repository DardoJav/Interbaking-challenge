import dotenv from 'dotenv';
import path , { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

interface Config {
  NODE_ENV: string;
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
}

const getConfig = (): Config => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/companies-transfers',
  JWT_SECRET: process.env.JWT_SECRET || 'ClaveSecreta123!@XYZ987',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
});

export const config = getConfig();