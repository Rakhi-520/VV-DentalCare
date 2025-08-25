import express from 'express';
import { validate, validateQuery } from '../middleware/validate.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { writeLimiter } from '../middleware/rateLimiter.js';

import {
  createAppointmentSchema,
  updateAppointmentStatusSchema,
  appointmentQuerySchema,
  contactSchema,
  bookedTimesQuerySchema,
} from '../validators/appointment.schema.js';

import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  getAppointment,
  deleteAppointment,
  handleContact,
  getBookedTimes,
  cancelOwnAppointment,   
} from '../controllers/appointment.controller.js';

const router = express.Router();

/* ------------------------- Public routes ------------------------- */

// Create a booking
router.post(
  '/',
  writeLimiter,
  validate(createAppointmentSchema),
  createAppointment
);

// Get reserved times for a doctor on a date
// (Controller expects doctorId & date as query params)
router.get(
  '/booked',
  validateQuery(bookedTimesQuerySchema),
  getBookedTimes
);

// Contact form
router.post(
  '/contact',
  writeLimiter,
  validate(contactSchema),
  handleContact
);

// Patient self-cancel BEFORE payment (token in body)
router.post(
  '/:id/cancel',
  writeLimiter,
  (req, _res, next) => {
    if (!req.body?.token) {
     
      return next({ status: 400, message: 'token is required' });
    }
    next();
  },
  cancelOwnAppointment
);

/* ------------------------- Admin routes ------------------------- */

// List appointments (filters via query)
router.get(
  '/',
  authenticateToken,
  requireRole('admin'),
  validateQuery(appointmentQuerySchema),
  getAppointments
);

// Get one appointment
router.get(
  '/:id',
  authenticateToken,
  requireRole('admin'),
  getAppointment
);

// Update status
router.patch(
  '/:id',
  authenticateToken,
  requireRole('admin'),
  writeLimiter,
  validate(updateAppointmentStatusSchema),
  updateAppointmentStatus
);

// Delete appointment
router.delete(
  '/:id',
  authenticateToken,
  requireRole('admin'),
  writeLimiter,
  deleteAppointment
);

export default router;
