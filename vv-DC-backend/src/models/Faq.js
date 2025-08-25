import mongoose from 'mongoose'

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  answer: {
    type: String,
    required: true,
    trim: true,
  },
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

// Index for ordering and filtering
faqSchema.index({ order: 1, isActive: 1 })
faqSchema.index({ question: 'text', answer: 'text' })

export default mongoose.model('Faq', faqSchema)