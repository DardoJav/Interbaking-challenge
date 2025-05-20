import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { config } from './config/env.js';
import logger from './utils/logger.js';
import indexRoutes from './routes/index.routes.js';
import { errorHandler, notFound } from './middleware/error.middleware.js';
import seedDatabase from './utils/seedDatabase.js';
import { connectToDatabase } from './config/db.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
app.use(helmet());

app.use('/api', indexRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectToDatabase();
    await seedDatabase();

    app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

process.on('SIGINT', async () => {
  await mongoose.disconnect();
  logger.info('MongoDB disconnected through app termination');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await mongoose.disconnect();
  logger.info('MongoDB disconnected through app termination');
  process.exit(0);
});

export default app;