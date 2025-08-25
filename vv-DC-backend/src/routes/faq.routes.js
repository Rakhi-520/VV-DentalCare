import express from 'express'
import { validate, validateQuery } from '../middleware/validate.js'
import { authenticateToken, requireRole } from '../middleware/auth.js'
import { cacheMiddleware } from '../utils/cache.js'
import { writeLimiter } from '../middleware/rateLimiter.js'
import {
  createFaqSchema,
  updateFaqSchema,
  faqQuerySchema,
} from '../validators/faq.schema.js'
import {
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  getFaq,
} from '../controllers/faq.controller.js'

const router = express.Router()

// Public routes
router.get(
  '/',
  validateQuery(faqQuerySchema),
  cacheMiddleware('faqs', 300000),
  getFaqs
)

// Admin routes
router.post(
  '/',
  authenticateToken,
  requireRole('admin'),
  writeLimiter,
  validate(createFaqSchema),
  createFaq
)
router.get(
  '/:id',
  authenticateToken,
  requireRole('admin'),
  getFaq
)
router.put(
  '/:id',
  authenticateToken,
  requireRole('admin'),
  writeLimiter,
  validate(updateFaqSchema),
  updateFaq
)
router.delete(
  '/:id',
  authenticateToken,
  requireRole('admin'),
  writeLimiter,
  deleteFaq
)

export default router