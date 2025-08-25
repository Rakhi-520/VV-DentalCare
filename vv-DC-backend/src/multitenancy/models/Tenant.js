import mongoose from 'mongoose';

const TenantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  status: { type: String, enum: ['active', 'suspended'], default: 'active' },
  domain: { type: String, trim: true }, // custom domain if any
  locale: { type: String, default: 'en' },
  timezone: { type: String, default: 'Asia/Kolkata' },
  branding: {
    logo: String,
    colors: mongoose.Schema.Types.Mixed,
    theme: mongoose.Schema.Types.Mixed,
  },
  providers: {
    email: mongoose.Schema.Types.Mixed,
    sms: mongoose.Schema.Types.Mixed,
    payments: mongoose.Schema.Types.Mixed,
  },
}, { timestamps: true });

TenantSchema.index({ slug: 1 }, { unique: true });

export default mongoose.model('Tenant', TenantSchema);