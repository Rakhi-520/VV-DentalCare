import express from 'express'
import { authenticateToken, requireRole } from '../middleware/auth.js'
import { cacheMiddleware } from '../utils/cache.js'
import { writeLimiter } from '../middleware/rateLimiter.js'
import {
  uploadFile,
  getGallery,
  deleteFile,
} from '../controllers/upload.controller.js'

const router = express.Router()

// Public routes
router.get('/gallery', cacheMiddleware('gallery', 300000), getGallery)

// Admin routes
router.post(
  '/',
  authenticateToken,
  requireRole('admin'),
  writeLimiter,
  uploadFile
)
router.delete(
  '/:id',
  authenticateToken,
  requireRole('admin'),
  writeLimiter,
  deleteFile
)

export default router