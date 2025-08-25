import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { logger } from "./config/logger.js";
import { errorHandler } from "./middleware/error.js";
import { notFound } from "./middleware/notFound.js";

import appointmentRoutes from "./routes/appointment.routes.js";
import routes from "./routes/index.js"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
/* ---------------------------- Security headers ---------------------------- */
app.disable("x-powered-by");
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

/* ---------------------------------- CORS ---------------------------------- */

const parseOrigins = (val) =>
  (val ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);


const ALLOWED_ORIGINS = parseOrigins(process.env.CORS_ORIGIN);
if (ALLOWED_ORIGINS.length === 0) {
  ALLOWED_ORIGINS.push("http://localhost:5173");
}

app.use(
  cors({
    origin: (origin, cb) => {

      if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);

// Optional: turn CORS errors into JSON instead of crashing the request
app.use((err, req, res, next) => {
  if (err && err.message?.startsWith("CORS blocked for origin")) {
    return res.status(403).json({ message: err.message });
  }
  return next(err);
});

/* --------------------------- Compression & parsing ------------------------- */
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

/* --------------------------------- Logging -------------------------------- */

const morganFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
app.use(
  morgan(morganFormat, {
    stream: { write: (msg) => logger.info(msg.trim()) },
    skip: (req) =>
      req.path === "/health" ||
      req.path.startsWith("/docs") ||
      req.path.startsWith("/favicon"),
  })
);

/* ------------------------------- Static files ------------------------------ */

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/* --------------------------------- Health --------------------------------- */
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
    env: process.env.NODE_ENV || "development",
  });
});

/* ------------------------------ API documentation ------------------------- */
(() => {
  try {
    const openapiPath = path.join(__dirname, "../openapi.yaml");
    if (fs.existsSync(openapiPath)) {
      const spec = yaml.load(fs.readFileSync(openapiPath, "utf8"));
      app.use(
        "/docs",
        swaggerUi.serve,
        swaggerUi.setup(spec, {
          explorer: true,
          customSiteTitle: "VV Dental Care API Docs",
        })
      );
      logger.info("Swagger UI mounted at /docs");
    } else {
      logger.warn("OpenAPI spec not found; skipping Swagger UI mount");
    }
  } catch (err) {
    logger.warn(`Could not load OpenAPI spec: ${err.message}`);
  }
})();

/* ---------------------------------- Routes -------------------------------- */

app.use("/api/appointments", appointmentRoutes);

/* ---------------------------------- Routes -------------------------------- */
app.use("/api", routes);

/* ------------------------------ Error handling ---------------------------- */
app.use(notFound);
app.use(errorHandler);

export default app;
