import { body, query } from 'express-validator';

// Create appointment
export const createAppointmentSchema = [
  body('patientName').notEmpty().withMessage('Patient name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('serviceId').isMongoId().withMessage('Valid serviceId is required'),
  body('doctorId').optional().isMongoId().withMessage('Invalid doctorId'),
  body('date')
  .matches(/^\d{4}-\d{2}-\d{2}$/)
  .withMessage('Date must be in YYYY-MM-DD format'),

  body('time')
  .matches(/^([01]\d|2[0-3]):[0-5]\d$/)
  .withMessage('Time must be in HH:mm format'),
  body('notes').optional().isString().trim(),
];

// Update status
export const updateAppointmentStatusSchema = [
  body('status')
    .isIn(['pending', 'confirmed', 'cancelled'])
    .withMessage('Invalid status'),
];

// Admin query params
export const appointmentQuerySchema = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('sort').optional().isString(),
  query('status').optional().isIn(['pending', 'confirmed', 'cancelled']),
  query('date')
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('Date must be YYYY-MM-DD'),
  query('doctorId').optional().isMongoId(),
  query('email').optional().isEmail(),
];

// Contact form
export const contactSchema = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').notEmpty().withMessage('Message is required'),
];

// Availability endpoint (booked times)
export const bookedTimesQuerySchema = [
  query('doctorId').isMongoId().withMessage('Valid doctorId is required'),
  query('date')
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('Date must be in YYYY-MM-DD format'),
];
