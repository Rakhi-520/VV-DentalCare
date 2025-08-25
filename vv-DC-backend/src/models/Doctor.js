import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
    required: true,
  },
  yearsExperience: {
    type: Number,
    required: true,
    min: 0,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  badges: [{
    type: String,
    trim: true,
  }],
}, {
  timestamps: true,
})

// Index for searching
doctorSchema.index({ fullName: 'text', role: 'text' })

export default mongoose.model('Doctor', doctorSchema)