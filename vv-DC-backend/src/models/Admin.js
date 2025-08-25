import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin'],
    default: 'admin',
  },
}, {
  timestamps: true,
})

// Hash password before saving
adminSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next()
  
  const salt = await bcrypt.genSalt(12)
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt)
  next()
})

// Compare password method
adminSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.passwordHash)
}

// Remove sensitive fields from JSON output
adminSchema.methods.toJSON = function () {
  const admin = this.toObject()
  delete admin.passwordHash
  return admin
}

export default mongoose.model('Admin', adminSchema)