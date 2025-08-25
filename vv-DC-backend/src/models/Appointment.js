import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

const appointmentSchema = new Schema(
  {
    patientName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (v) => validator.isEmail(v || ""),
        message: "Invalid email",
      },
    },

    phone: {
      type: String,
      required: true,
      trim: true,
  
    },

    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    date: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{2}-\d{2}$/, "Invalid date format YYYY-MM-DD"],
    },

    time: {
      type: String,
      required: true,
      match: [/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid time format HH:mm"],
    },

    notes: { type: String, trim: true, default: "" },

    // Booking lifecycle
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "expired"],
      default: "pending",
      index: true,
    },

    // Payment lifecycle
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded", "failed"],
      default: "unpaid",
      index: true,
    },
    paymentTxnId: { type: String, default: null },
    paidAt: { type: Date, default: null },

    // Who created the booking (optional)
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    // Cancellation metadata
    cancelledAt: { type: Date, default: null },
    cancellationReason: { type: String, default: null },

    // Token to allow self-cancel BEFORE payment only
    cancelToken: {
      type: String,
      index: true,
      select: false,
      default: null,
    },
  },
  {
    timestamps: true, 
  }
);


appointmentSchema.index(
  { doctorId: 1, date: 1, time: 1 },
  { unique: true, partialFilterExpression: { status: { $nin: ["cancelled", "expired"] } } }
);


appointmentSchema.index({ date: 1, status: 1 });
appointmentSchema.index({ email: 1 });

export default mongoose.model("Appointment", appointmentSchema);
