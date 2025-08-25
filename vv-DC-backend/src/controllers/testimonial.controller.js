import { asyncHandler } from '../utils/asyncHandler.js'
import { successResponse, errorResponse, paginatedResponse } from '../utils/responses.js'
import { invalidateCache } from '../utils/cache.js'
import Testimonial from '../models/Testimonial.js'

/**
 * @desc    Get testimonials
 * @route   GET /api/testimonials
 * @access  Public
 */
export const getTestimonials = asyncHandler(async (req, res) => {
  const { page = 1, limit = 6, sort = '-createdAt' } = req.query

  const testimonials = await Testimonial.find()
    .sort(sort)
    .limit(limit * page)
    .skip((page - 1) * limit)

  const total = await Testimonial.countDocuments()

  const pagination = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    total,
    pages: Math.ceil(total / limit),
  }

  paginatedResponse(res, testimonials, pagination, 'Testimonials retrieved successfully')
})

/**
 * @desc    Create new testimonial
 * @route   POST /api/testimonials
 * @access  Private (Admin)
 */
export const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.create(req.body)
  
  // Invalidate testimonials cache
  invalidateCache('testimonials')
  
  successResponse(res, testimonial, 'Testimonial created successfully', 201)
})

/**
 * @desc    Update testimonial
 * @route   PUT /api/testimonials/:id
 * @access  Private (Admin)
 */
export const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  )

  if (!testimonial) {
    return errorResponse(res, 'Testimonial not found', 404)
  }

  // Invalidate testimonials cache
  invalidateCache('testimonials')

  successResponse(res, testimonial, 'Testimonial updated successfully')
})

/**
 * @desc    Delete testimonial
 * @route   DELETE /api/testimonials/:id
 * @access  Private (Admin)
 */
export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id)

  if (!testimonial) {
    return errorResponse(res, 'Testimonial not found', 404)
  }

  // Invalidate testimonials cache
  invalidateCache('testimonials')

  successResponse(res, null, 'Testimonial deleted successfully')
})

/**
 * @desc    Get single testimonial
 * @route   GET /api/testimonials/:id
 * @access  Private (Admin)
 */
export const getTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id)

  if (!testimonial) {
    return errorResponse(res, 'Testimonial not found', 404)
  }

  successResponse(res, testimonial, 'Testimonial retrieved successfully')
})