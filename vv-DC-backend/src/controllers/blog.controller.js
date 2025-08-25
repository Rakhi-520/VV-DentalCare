import { asyncHandler } from '../utils/asyncHandler.js'
import { successResponse, errorResponse, paginatedResponse } from '../utils/responses.js'
import { invalidateCache } from '../utils/cache.js'
import Blog from '../models/Blog.js'

/**
 * @desc    Get published blog posts
 * @route   GET /api/blog
 * @access  Public
 */
export const getBlogPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sort = '-publishedAt', tag, q } = req.query

  const query = { isPublished: true }
  
  // Filter by tag
  if (tag) {
    query.tags = { $in: [tag.toLowerCase()] }
  }

  // Text search
  if (q) {
    query.$text = { $search: q }
  }

  const posts = await Blog.find(query)
    .sort(sort)
    .limit(limit * page)
    .skip((page - 1) * limit)
    .select('-content') // Exclude full content for list view

  const total = await Blog.countDocuments(query)

  const pagination = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    total,
    pages: Math.ceil(total / limit),
  }

  paginatedResponse(res, posts, pagination, 'Blog posts retrieved successfully')
})

/**
 * @desc    Get blog post by slug
 * @route   GET /api/blog/:slug
 * @access  Public
 */
export const getBlogPostBySlug = asyncHandler(async (req, res) => {
  const post = await Blog.findOne({ 
    slug: req.params.slug, 
    isPublished: true 
  })

  if (!post) {
    return errorResponse(res, 'Blog post not found', 404)
  }

  successResponse(res, post, 'Blog post retrieved successfully')
})

/**
 * @desc    Get all blog posts (Admin)
 * @route   GET /api/admin/blog
 * @access  Private (Admin)
 */
export const getAllBlogPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sort = '-createdAt', published, q } = req.query

  const query = {}
  
  // Filter by published status
  if (published !== undefined) {
    query.isPublished = published
  }

  // Text search
  if (q) {
    query.$text = { $search: q }
  }

  const posts = await Blog.find(query)
    .sort(sort)
    .limit(limit * page)
    .skip((page - 1) * limit)

  const total = await Blog.countDocuments(query)

  const pagination = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    total,
    pages: Math.ceil(total / limit),
  }

  paginatedResponse(res, posts, pagination, 'Blog posts retrieved successfully')
})

/**
 * @desc    Create new blog post
 * @route   POST /api/blog
 * @access  Private (Admin)
 */
export const createBlogPost = asyncHandler(async (req, res) => {
  const post = await Blog.create(req.body)
  
  // Invalidate blog cache
  invalidateCache('blog')
  
  successResponse(res, post, 'Blog post created successfully', 201)
})

/**
 * @desc    Update blog post
 * @route   PUT /api/blog/:id
 * @access  Private (Admin)
 */
export const updateBlogPost = asyncHandler(async (req, res) => {
  const post = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  )

  if (!post) {
    return errorResponse(res, 'Blog post not found', 404)
  }

  // Invalidate blog cache
  invalidateCache('blog')

  successResponse(res, post, 'Blog post updated successfully')
})

/**
 * @desc    Delete blog post
 * @route   DELETE /api/blog/:id
 * @access  Private (Admin)
 */
export const deleteBlogPost = asyncHandler(async (req, res) => {
  const post = await Blog.findByIdAndDelete(req.params.id)

  if (!post) {
    return errorResponse(res, 'Blog post not found', 404)
  }

  // Invalidate blog cache
  invalidateCache('blog')

  successResponse(res, null, 'Blog post deleted successfully')
})

/**
 * @desc    Get single blog post by ID (Admin)
 * @route   GET /api/blog/:id
 * @access  Private (Admin)
 */
export const getBlogPost = asyncHandler(async (req, res) => {
  const post = await Blog.findById(req.params.id)

  if (!post) {
    return errorResponse(res, 'Blog post not found', 404)
  }

  successResponse(res, post, 'Blog post retrieved successfully')
})