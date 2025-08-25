import express from 'express'
import { validate, validateQuery } from '../middleware/validate.js'
import { authenticateToken, requireRole } from '../middleware/auth.js'
import { cacheMiddleware } from '../utils/cache.js'
import { writeLimiter } from '../middleware/rateLimiter.js'
import {
  createTestimonialSchema,
  updateTestimonialSchema,
  testimonialQuerySchema,
} from '../validators/testimonial.schema.js'
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getTestimonial,
} from '../controllers/testimonial.controller.js'

const router = express.Router()

// Public routes
router.get(
  '/',
  validateQuery(testimonialQuerySchema),
  cacheMiddleware('testimonials', 300000),
  getTestimonials
)

// Admin routes
router.post(
  '/',
  authenticateToken,
  requireRole('admin'),
  writeLimiter,
  validate(createTestimonialSchema),
  createTestimonial
)
router.get(
  '/:id',
  authenticateToken,
  requireRole('admin'),
  getTestimonial
)
router.put(
  '/:id',
  authenticateToken,
  requireRole('admin'),
  writeLimiter,
  validate(updateTestimonialSchema),
  updateTestimonial
)
router.delete(
  '/:id',
  authenticateToken,
  requireRole('admin'),
  writeLimiter,
  deleteTestimonial
)

export default router