import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    // Which appointment this payment is for
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true,
      index: true,
    },

    // Money
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'INR' },

    // Which provider/method the user chose (we'll simulate them)
    provider: { type: String, enum: ['stripe', 'razorpay', 'upi'], required: true },
    method: { type: String, enum: ['card', 'upi_qr'], required: true },

    // Payment lifecycle
    status: {
      type: String,
      enum: ['pending', 'succeeded', 'failed', 'cancelled'],
      default: 'pending',
      index: true,
    },

    // Human/searchable reference for receipts etc.
    reference: { type: String, unique: true, sparse: true },

    // For UPI (Google Pay/Paytm) we’ll generate a UPI deeplink string
    upiString: { type: String, default: null },

    // Optional metadata
    notes: { type: String, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  },
  { timestamps: true }
);

paymentSchema.index({ appointmentId: 1, status: 1 });

export default mongoose.model('Payment', paymentSchema);
