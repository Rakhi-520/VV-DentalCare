
import mongoose from "mongoose";
import { logger } from "../config/logger.js";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in .env");
  }

  logger.info(`[DB] Connecting to: ${uri}`);

  try {
    const conn = await mongoose.connect(uri, {
      // These options are harmless if ignored by your mongoose version
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    logger.info(`[DB] MongoDB connected: ${conn.connection.host}`);

    // Connection events
    mongoose.connection.on("error", (err) => {
      logger.error("[DB] MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("[DB] MongoDB disconnected");
    });

    return conn;
  } catch (err) {
    logger.error("[DB] Database connection failed:", err);
    throw err;
  }
}
