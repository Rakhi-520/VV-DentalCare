import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler.js'
import { errorResponse } from '../utils/responses.js'
import Admin from '../models/Admin.js'

/**
 * Verify JWT access token and authenticate admin user
 */
export const authenticateToken = asyncHandler(async (req, res, next) => {
  let token

  // Check Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return errorResponse(res, 'Access token required', 401)
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

    // Get admin from database
    const admin = await Admin.findById(decoded.id).select('-passwordHash')

    if (!admin) {
      return errorResponse(res, 'Admin not found', 401)
    }

    req.user = admin
    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return errorResponse(res, 'Invalid token', 401)
    }
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Token expired', 401)
    }
    throw error
  }
})

/**
 * Check if user has required role (currently only admin)
 */
export const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return errorResponse(res, 'Insufficient permissions', 403)
    }
    next()
  }
}