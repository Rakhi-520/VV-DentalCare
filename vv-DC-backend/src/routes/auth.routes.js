import express from 'express'
import { validate } from '../middleware/validate.js'
import { authenticateToken } from '../middleware/auth.js'
import { authLimiter } from '../middleware/rateLimiter.js'
import { loginSchema } from '../validators/auth.schema.js'
import {
  login,
  refreshToken,
  logout,
  getProfile,
} from '../controllers/auth.controller.js'

const router = express.Router()

// Public routes
router.post('/login', authLimiter, validate(loginSchema), login)
router.post('/refresh', authLimiter, refreshToken)

// Protected routes
router.post('/logout', authenticateToken, logout)
router.get('/me', authenticateToken, getProfile)

export default router