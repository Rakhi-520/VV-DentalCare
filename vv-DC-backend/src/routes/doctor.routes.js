import express from 'express';
import { validate, validateQuery } from '../middleware/validate.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { cacheMiddleware } from '../utils/cache.js';
import { writeLimiter } from '../middleware/rateLimiter.js';

import {
  createDoctorSchema,
  updateDoctorSchema,
  doctorQuerySchema,
} from '../validators/doctor.schema.js';

import {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctor.controller.js';

const router = express.Router();

/* ------------------------------- Public ---------------------------------- */

// GET /api/doctors
router.get(
  '/',
  validateQuery(doctorQuerySchema),
  cacheMiddleware('doctors', 300000), 
  getDoctors
);

// GET /api/doctors/:id
router.get(
  '/:id',
  cacheMiddleware('doctor', 300000),
  getDoctor
);

/* -------------------------------- Admin ---------------------------------- */

// POST /api/doctors
router.post(
  '/',
  authenticateToken,
  requireRole('admin'),
  writeLimiter,
  validate(createDoctorSchema),
  createDoctor
);

// PUT /api/doctors/:id
router.put(
  '/:id',
  authenticateToken,
  requireRole('admin'),
  writeLimiter,
  validate(updateDoctorSchema),
  updateDoctor
);

// DELETE /api/doctors/:id
router.delete(
  '/:id',
  authenticateToken,
  requireRole('admin'),
  writeLimiter,
  deleteDoctor
);

export default router;
