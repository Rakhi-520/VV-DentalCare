import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  heroImage: {
    type: String,
    required: true,
  },
  features: [{
    type: String,
    trim: true,
  }],
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
})

// Index for searching and sorting
serviceSchema.index({ slug: 1 })
serviceSchema.index({ order: 1 })
serviceSchema.index({ isActive: 1 })
serviceSchema.index({ title: 'text', description: 'text' })

// Generate slug from title before saving
serviceSchema.pre('save', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  next()
})

export default mongoose.model('Service', serviceSchema)