import 'dotenv/config.js';
import http from 'http';
import mongoose from 'mongoose';
import app from './app.js';
import { logger } from './config/logger.js';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vv-dental';

const server = http.createServer(app);

async function start() {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(MONGO_URI);
    logger.info('MongoDB connected');
    server.listen(PORT, () =>
      logger.info(`Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    logger.error(`Failed to start server: ${err.message}`);
    process.exit(1);
  }
}

start();

function shutdown() {
  logger.info('Shutting down...');
  server.close(() => {
    mongoose.connection.close(false).then(() => process.exit(0));
  });
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
