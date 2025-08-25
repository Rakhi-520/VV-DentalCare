import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  roles: { type: [String], enum: ['SuperAdmin','ClinicAdmin','Staff'], default: ['ClinicAdmin'] },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', default: null }, // null for SuperAdmin
  profile: {
    name: String,
    phone: String,
  },
  lastLogin: Date,
}, { timestamps: true });

UserSchema.methods.setPassword = async function (pwd) {
  this.passwordHash = await bcrypt.hash(pwd, 10);
};
UserSchema.methods.comparePassword = function (pwd) {
  return bcrypt.compare(pwd, this.passwordHash);
};

export default mongoose.model('User', UserSchema);