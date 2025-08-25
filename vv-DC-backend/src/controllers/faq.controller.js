import { asyncHandler } from '../utils/asyncHandler.js'
import { successResponse, errorResponse, paginatedResponse } from '../utils/responses.js'
import { invalidateCache } from '../utils/cache.js'
import Faq from '../models/Faq.js'

/**
 * @desc    Get active FAQs
 * @route   GET /api/faqs
 * @access  Public
 */
export const getFaqs = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, sort = 'order', active } = req.query

  const query = {}
  
  // Filter by active status if specified
  if (active !== undefined) {
    query.isActive = active
  } else {
    // Default to active FAQs for public API
    query.isActive = true
  }

  const faqs = await Faq.find(query)
    .sort(sort)
    .limit(limit * page)
    .skip((page - 1) * limit)

  const total = await Faq.countDocuments(query)

  const pagination = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    total,
    pages: Math.ceil(total / limit),
  }

  paginatedResponse(res, faqs, pagination, 'FAQs retrieved successfully')
})

/**
 * @desc    Create new FAQ
 * @route   POST /api/faqs
 * @access  Private (Admin)
 */
export const createFaq = asyncHandler(async (req, res) => {
  const faq = await Faq.create(req.body)
  
  // Invalidate FAQs cache
  invalidateCache('faqs')
  
  successResponse(res, faq, 'FAQ created successfully', 201)
})

/**
 * @desc    Update FAQ
 * @route   PUT /api/faqs/:id
 * @access  Private (Admin)
 */
export const updateFaq = asyncHandler(async (req, res) => {
  const faq = await Faq.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  )

  if (!faq) {
    return errorResponse(res, 'FAQ not found', 404)
  }

  // Invalidate FAQs cache
  invalidateCache('faqs')

  successResponse(res, faq, 'FAQ updated successfully')
})

/**
 * @desc    Delete FAQ
 * @route   DELETE /api/faqs/:id
 * @access  Private (Admin)
 */
export const deleteFaq = asyncHandler(async (req, res) => {
  const faq = await Faq.findByIdAndDelete(req.params.id)

  if (!faq) {
    return errorResponse(res, 'FAQ not found', 404)
  }

  // Invalidate FAQs cache
  invalidateCache('faqs')

  successResponse(res, null, 'FAQ deleted successfully')
})

/**
 * @desc    Get single FAQ
 * @route   GET /api/faqs/:id
 * @access  Private (Admin)
 */
export const getFaq = asyncHandler(async (req, res) => {
  const faq = await Faq.findById(req.params.id)

  if (!faq) {
    return errorResponse(res, 'FAQ not found', 404)
  }

  successResponse(res, faq, 'FAQ retrieved successfully')
})