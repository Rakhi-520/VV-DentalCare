import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { asyncHandler } from '../utils/asyncHandler.js'
import { successResponse, errorResponse } from '../utils/responses.js'
import { config } from '../config/env.js'
import Asset from '../models/Asset.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/'))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  },
})

const fileFilter = (req, file, cb) => {
  // Check file type
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = allowedTypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, PDF, DOC, and DOCX files are allowed.'))
  }
}

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter,
}).single('file')

/**
 * @desc    Upload file
 * @route   POST /api/upload
 * @access  Private (Admin)
 */
export const uploadFile = asyncHandler(async (req, res) => {
  // Handle multer upload
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return errorResponse(res, 'File too large. Maximum size is 5MB.', 400)
      }
      return errorResponse(res, err.message, 400)
    } else if (err) {
      return errorResponse(res, err.message, 400)
    }

    if (!req.file) {
      return errorResponse(res, 'No file uploaded', 400)
    }

    try {
      // Determine file type
      const imageTypes = /jpeg|jpg|png|gif/
      const isImage = imageTypes.test(path.extname(req.file.originalname).toLowerCase())
      
      const fileType = isImage ? 'image' : 'doc'
      const fileUrl = `${config.appBaseUrl}/uploads/${req.file.filename}`

      // Save file info to database
      const asset = await Asset.create({
        filename: req.file.filename,
        url: fileUrl,
        type: fileType,
        alt: req.body.alt || '',
      })

      successResponse(res, {
        id: asset._id,
        filename: asset.filename,
        url: asset.url,
        type: asset.type,
        alt: asset.alt,
      }, 'File uploaded successfully', 201)
    } catch (error) {
      // Clean up uploaded file if database save fails
      const fs = await import('fs')
      fs.unlinkSync(req.file.path)
      throw error
    }
  })
})

/**
 * @desc    Get gallery images
 * @route   GET /api/gallery
 * @access  Public
 */
export const getGallery = asyncHandler(async (req, res) => {
  const images = await Asset.find({ type: 'image' })
    .sort('-createdAt')
    .select('url alt createdAt')

  successResponse(res, images, 'Gallery images retrieved successfully')
})

/**
 * @desc    Delete uploaded file
 * @route   DELETE /api/upload/:id
 * @access  Private (Admin)
 */
export const deleteFile = asyncHandler(async (req, res) => {
  const asset = await Asset.findByIdAndDelete(req.params.id)

  if (!asset) {
    return errorResponse(res, 'File not found', 404)
  }

  // Delete physical file
  try {
    const fs = await import('fs')
    const filePath = path.join(__dirname, '../../uploads/', asset.filename)
    fs.unlinkSync(filePath)
  } catch (error) {
    // File might already be deleted, continue anyway
  }

  successResponse(res, null, 'File deleted successfully')
})