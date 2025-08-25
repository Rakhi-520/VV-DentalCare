import express from 'express'
import { validate, validateQuery } from '../middleware/validate.js'
import { authenticateToken, requireRole } from '../middleware/auth.js'
import { cacheMiddleware } from '../utils/cache.js'
import { writeLimiter } from '../middleware/rateLimiter.js'
import {
  createServiceSchema,
  updateServiceSchema,
  serviceQuerySchema,
} from '../validators/service.schema.js'
import {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
  getService,
} from '../controllers/service.controller.js'

const router = express.Router()

// Public routes
router.get(
  '/',
  validateQuery(serviceQuerySchema),
  cacheMiddleware('services', 300000),
  getServices
)
router.get('/:slug', cacheMiddleware('service', 300000), getServiceBySlug)

// Admin routes
router.post(
  '/',
  authenticateToken,
  requireRole('admin'),
  writeLimiter,
  validate(createServiceSchema),
  createService
)
router.put(
  '/:id',
  authenticateToken,
  requireRole('admin'),
  writeLimiter,
  validate(updateServiceSchema),
  updateService
)
router.delete(
  '/:id',
  authenticateToken,
  requireRole('admin'),
  writeLimiter,
  deleteService
)
router.get(
  '/admin/:id',
  authenticateToken,
  requireRole('admin'),
  getService
)

export default router