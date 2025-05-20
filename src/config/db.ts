import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import { MONGO_URI } from '../utils/constants.js';

export const connectToDatabase = async () => {
  try {
    if (process.env.NODE_ENV === 'test') return;
    await mongoose.connect(MONGO_URI);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export const disconnectFromDatabase = async () => {
  await mongoose.disconnect();
  logger.info('Disconnected from MongoDB');
};