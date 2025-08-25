import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse, errorResponse } from '../utils/responses.js';
import Appointment from '../models/Appointment.js';
import Payment from '../models/Payment.js';
import mongoose from 'mongoose';
import crypto from 'crypto';
import { buildUpiString } from '../utils/upi.js';

const { isValidObjectId } = mongoose;

/**
 * @desc    Create a dummy payment session for an appointment
 * @route   POST /api/payments/session
 * @access  Public (rate-limited)
 * @body    { appointmentId, amount, provider: 'stripe'|'razorpay'|'upi', method: 'card'|'upi_qr' }
 */
export const createPaymentSession = asyncHandler(async (req, res) => {
  const { appointmentId, amount, provider, method } = req.body || {};

  if (!appointmentId || !isValidObjectId(appointmentId)) {
    return errorResponse(res, 'Invalid appointmentId', 400);
  }
  if (typeof amount !== 'number' || amount <= 0) {
    return errorResponse(res, 'Invalid amount', 400);
  }
  if (!['stripe', 'razorpay', 'upi'].includes(provider)) {
    return errorResponse(res, 'Invalid provider', 400);
  }
  if (!['card', 'upi_qr'].includes(method)) {
    return errorResponse(res, 'Invalid method', 400);
  }

  const appt = await Appointment.findById(appointmentId);
  if (!appt) return errorResponse(res, 'Appointment not found', 404);
  if (appt.status === 'cancelled' || appt.status === 'expired') {
    return errorResponse(res, 'Appointment is not eligible for payment', 400);
  }
  if (appt.paymentStatus === 'paid') {
    return errorResponse(res, 'Appointment already paid', 400);
  }

  // human/searchable reference
  const reference = `PAY-${crypto.randomBytes(6).toString('hex').toUpperCase()}`;

  const paymentDoc = {
    appointmentId,
    amount,
    currency: 'INR',
    provider,
    method,
    status: 'pending',
    reference,
    createdBy: req.user?._id || null,
  };

  // If UPI flow, generate a UPI deeplink string for QR
  if (provider === 'upi' && method === 'upi_qr') {
    const pa = process.env.UPI_PAYEE_VPA || 'clinic@upi';
    const pn = process.env.UPI_PAYEE_NAME || 'Dental Clinic';
    const tn = `Appt ${appt._id.toString().slice(-6)} on ${appt.date} ${appt.time}`;
    paymentDoc.upiString = buildUpiString({
      pa,
      pn,
      am: amount,
      tn,
      tr: reference,
      cu: 'INR',
    });
  }

  const payment = await Payment.create(paymentDoc);

  return successResponse(
    res,
    {
      _id: payment._id,
      appointmentId: payment.appointmentId,
      amount: payment.amount,
      currency: payment.currency,
      provider: payment.provider,
      method: payment.method,
      status: payment.status,
      reference: payment.reference,
      upiString: payment.upiString || null,
      createdAt: payment.createdAt,
    },
    'Payment session created',
    201
  );
});

/**
 * @desc    Confirm a dummy payment (marks appointment as paid)
 * @route   POST /api/payments/:id/confirm
 * @access  Public (rate-limited)
 * @body    { succeed?: boolean } // default true
 */
export const confirmPayment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { succeed = true } = req.body || {};

  if (!isValidObjectId(id)) return errorResponse(res, 'Invalid payment id', 400);

  const payment = await Payment.findById(id);
  if (!payment) return errorResponse(res, 'Payment not found', 404);

  // Idempotent: if already finalised, return OK
  if (['succeeded', 'failed', 'cancelled'].includes(payment.status)) {
    return successResponse(res, { status: payment.status }, 'Payment already processed');
  }

  // Load appointment
  const appt = await Appointment.findById(payment.appointmentId);
  if (!appt) return errorResponse(res, 'Linked appointment not found', 404);

  if (succeed) {
    payment.status = 'succeeded';
    await payment.save();

    appt.paymentStatus = 'paid';
    appt.paidAt = new Date();
    appt.paymentTxnId = payment.reference || payment._id.toString();
    
    if (appt.status === 'pending') appt.status = 'confirmed';
    await appt.save();

    return successResponse(res, { status: payment.status }, 'Payment succeeded');
  } else {
    payment.status = 'failed';
    await payment.save();
    return successResponse(res, { status: payment.status }, 'Payment failed');
  }
});
