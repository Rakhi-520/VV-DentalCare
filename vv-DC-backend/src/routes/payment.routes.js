import express from 'express';
import { writeLimiter } from '../middleware/rateLimiter.js';
import { validate } from '../middleware/validate.js';
import { createPaymentSession, confirmPayment } from '../controllers/payment.controller.js';

// Simple inline validators to keep it lightweight without new schemas
const validateCreateSession = (req, _res, next) => {
  const { appointmentId, amount, provider, method } = req.body || {};
  if (!appointmentId || !amount || !provider || !method) {
    return next({ status: 400, message: 'appointmentId, amount, provider, method are required' });
  }
  next();
};

const router = express.Router();

router.post(
  '/session',
  writeLimiter,
  validate(validateCreateSession),
  createPaymentSession
);

router.post(
  '/:id/confirm',
  writeLimiter,
  confirmPayment
);

export default router;
