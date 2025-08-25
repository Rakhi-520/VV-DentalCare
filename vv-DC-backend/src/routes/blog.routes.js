import express from 'express'
import { validate, validateQuery } from '../middleware/validate.js'
import { authenticateToken, requireRole } from '../middleware/auth.js'
import { cacheMiddleware } from '../utils/cache.js'
import { writeLimiter } from '../middleware/rateLimiter.js'
import {
  createBlogSchema,
  updateBlogSchema,
  blogQuerySchema,
} from '../validators/blog.schema.js'
import {
  getBlogPosts,
  getBlogPostBySlug,
  getAllBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogPost,
} from '../controllers/blog.controller.js'

const router = express.Router()

// Public routes
router.get(
  '/',
  validateQuery(blogQuerySchema),
  cacheMiddleware('blog', 300000),
  getBlogPosts
)
router.get('/:slug', cacheMiddleware('blog-post', 300000), getBlogPostBySlug)

// Admin routes
router.get(
  '/admin/all',
  authenticateToken,
  requireRole('admin'),
  validateQuery(blogQuerySchema),
  getAllBlogPosts
)
router.post(
  '/',
  authenticateToken,
  requireRole('admin'),
  writeLimiter,
  validate(createBlogSchema),
  createBlogPost
)
router.get(
  '/admin/:id',
  authenticateToken,
  requireRole('admin'),
  getBlogPost
)
router.put(
  '/:id',
  authenticateToken,
  requireRole('admin'),
  writeLimiter,
  validate(updateBlogSchema),
  updateBlogPost
)
router.delete(
  '/:id',
  authenticateToken,
  requireRole('admin'),
  writeLimiter,
  deleteBlogPost
)

export default router