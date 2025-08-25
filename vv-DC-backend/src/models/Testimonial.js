import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
    trim: true,
  },
  quote: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
})

// Index for sorting by creation date
testimonialSchema.index({ createdAt: -1 })

export default mongoose.model('Testimonial', testimonialSchema)