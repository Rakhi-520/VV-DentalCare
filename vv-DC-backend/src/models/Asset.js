import mongoose from 'mongoose'

const assetSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['image', 'doc'],
    required: true,
  },
  alt: {
    type: String,
    trim: true,
    default: '',
  },
}, {
  timestamps: true,
})

// Index for filtering by type
assetSchema.index({ type: 1 })
assetSchema.index({ createdAt: -1 })

export default mongoose.model('Asset', assetSchema)