import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/responses.js';
import { emailService } from '../utils/email.js';
import { logger } from '../config/logger.js';
import Appointment from '../models/Appointment.js';
import Service from '../models/Service.js';
import Doctor from '../models/Doctor.js';
import mongoose from 'mongoose';
import crypto from 'crypto';

const { isValidObjectId } = mongoose;

// ---- helpers ----
const DATE_RX = /^\d{4}-\d{2}-\d{2}$/;          // YYYY-MM-DD
const TIME_RX = /^([01]\d|2[0-3]):[0-5]\d$/;    // HH:mm 24h
const ALLOWED_STATUSES = ['pending', 'confirmed', 'cancelled', 'expired'];

const makeSlot = (date, time) => new Date(`${date}T${time}:00.000Z`);

// ---- Controllers ----

/**
 * @desc    Create new appointment
 * @route   POST /api/appointments
 * @access  Public
 */
export const createAppointment = asyncHandler(async (req, res) => {
  const {
    patientName,
    email,
    phone,
    serviceId,
    doctorId = null,
    date,
    time,
    notes = '',
  } = req.body || {};

  // Basic field validation (cheap and explicit; Mongoose will re-validate)
  if (!patientName || !email || !phone || !serviceId || !date || !time) {
    return errorResponse(res, 'Missing required fields', 400);
  }
  if (!isValidObjectId(serviceId)) return errorResponse(res, 'Invalid serviceId', 400);
  if (doctorId && !isValidObjectId(doctorId)) return errorResponse(res, 'Invalid doctorId', 400);
  if (!DATE_RX.test(date)) return errorResponse(res, 'Invalid date format (expected YYYY-MM-DD)', 400);
  if (!TIME_RX.test(time)) return errorResponse(res, 'Invalid time format (expected HH:mm)', 400);

  // Future slot check
  const slot = makeSlot(date, time);
  if (Number.isNaN(slot.getTime())) return errorResponse(res, 'Invalid date/time', 400);
  if (slot < new Date()) return errorResponse(res, 'Please choose a future date/time', 400);

  // Service must exist
  const service = await Service.findById(serviceId).select('_id title');
  if (!service) return errorResponse(res, 'Service not found', 400);

  // Doctor (optional) must exist
  let doctor = null;
  if (doctorId) {
    doctor = await Doctor.findById(doctorId).select('_id fullName');
    if (!doctor) return errorResponse(res, 'Doctor not found', 400);

    // Prevent double booking at app layer (unique index is final guard)
    const clash = await Appointment.findOne({
      doctorId,
      date,
      time,
      // only treat pending/confirmed as locking the slot
      status: { $in: ['pending', 'confirmed'] },
    }).lean();
    if (clash) return errorResponse(res, 'Time slot is already booked', 409);
  }

  // Generate cancel token for pre-payment self-cancel flows
  const cancelToken = crypto.randomBytes(24).toString('hex');

  // Create appointment (defaults reinforced here for clarity)
  const doc = {
    patientName,
    email,
    phone,
    serviceId,
    doctorId: doctorId || null,
    date,
    time,
    notes,
    source: 'website',
    status: 'pending',
    paymentStatus: 'unpaid',
    cancelToken,
  };

  // Set createdBy only if the request is authenticated
  if (req.user?._id) {
    doc.createdBy = req.user._id;
  }

  const appointment = await Appointment.create(doc);

  // Populate for email/template needs
  await appointment.populate([
    { path: 'serviceId', select: 'title' },
    { path: 'doctorId', select: 'fullName' },
  ]);

  // Fire-and-forget email (do not fail booking if email fails)
  try {
   await emailService.sendAppointmentConfirmation(
  appointment,
  appointment.serviceId,
  appointment.doctorId,
  {
    cancelUrl: `${process.env.CLIENT_URL}/appointments/cancel?id=${appointment._id}&token=${appointment.cancelToken}`
  }
);
  } catch (e) {
    logger.error('Failed to send appointment confirmation email:', e);
  }

  return successResponse(res, appointment, 'Appointment created successfully', 201);
});

/**
 * @desc    Get appointments (Admin)
 * @route   GET /api/appointments
 * @access  Private (Admin)
 * @query   page, limit, sort, status, date, doctorId, email
 */
export const getAppointments = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page ?? '1', 10), 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit ?? '10', 10), 1), 100);
  const sort = req.query.sort || '-createdAt';
  const { status, date, doctorId, email } = req.query;

  const query = {};
  if (status) {
    if (!ALLOWED_STATUSES.includes(status)) return errorResponse(res, 'Invalid status filter', 400);
    query.status = status;
  }
  if (date) {
    if (!DATE_RX.test(date)) return errorResponse(res, 'Invalid date filter (YYYY-MM-DD)', 400);
    query.date = date;
  }
  if (doctorId) {
    if (!isValidObjectId(doctorId)) return errorResponse(res, 'Invalid doctorId', 400);
    query.doctorId = doctorId;
  }
  if (email) query.email = email;

  const [appointments, total] = await Promise.all([
    Appointment.find(query)
      .populate('serviceId', 'title')
      .populate('doctorId', 'fullName')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit),
    Appointment.countDocuments(query),
  ]);

  const pagination = {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
  };

  return paginatedResponse(res, appointments, pagination, 'Appointments retrieved successfully');
});

/**
 * @desc    Update appointment status
 * @route   PATCH /api/appointments/:id
 * @access  Private (Admin)
 * @body    { status: 'pending' | 'confirmed' | 'cancelled' | 'expired' }
 */
export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!isValidObjectId(id)) return errorResponse(res, 'Invalid appointment id', 400);
  if (!ALLOWED_STATUSES.includes(status)) return errorResponse(res, 'Invalid status', 400);

  const appointment = await Appointment.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  )
    .populate('serviceId', 'title')
    .populate('doctorId', 'fullName');

  if (!appointment) return errorResponse(res, 'Appointment not found', 404);

  logger.info(`Appointment ${appointment._id} status updated to ${status}`);
  return successResponse(res, appointment, 'Appointment status updated successfully');
});

/**
 * @desc    Get single appointment
 * @route   GET /api/appointments/:id
 * @access  Private (Admin)
 */
export const getAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return errorResponse(res, 'Invalid appointment id', 400);

  const appointment = await Appointment.findById(id)
    .populate('serviceId', 'title')
    .populate('doctorId', 'fullName');

  if (!appointment) return errorResponse(res, 'Appointment not found', 404);

  return successResponse(res, appointment, 'Appointment retrieved successfully');
});

/**
 * @desc    Delete appointment
 * @route   DELETE /api/appointments/:id
 * @access  Private (Admin)
 */
export const deleteAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return errorResponse(res, 'Invalid appointment id', 400);

  const appointment = await Appointment.findByIdAndDelete(id);
  if (!appointment) return errorResponse(res, 'Appointment not found', 404);

  return successResponse(res, null, 'Appointment deleted successfully');
});

/**
 * @desc    Handle contact form submission
 * @route   POST /api/contact
 * @access  Public
 */
export const handleContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !subject || !message) {
    return errorResponse(res, 'All fields are required', 400);
  }
  try {
    await emailService.sendContactMessage({ name, email, subject, message });
    logger.info(`Contact form submission from ${email}`);
    return successResponse(res, null, 'Message sent successfully');
  } catch (error) {
    logger.error('Failed to send contact message:', error);
    return errorResponse(res, 'Failed to send message', 500);
  }
});

/**
 * @desc    Get reserved times for a doctor on a date (for booking UI)
 * @route   GET /api/appointments/booked?doctorId=...&date=YYYY-MM-DD
 * @access  Public
 */
export const getBookedTimes = asyncHandler(async (req, res) => {
  const { doctorId, date } = req.query;

  if (!doctorId || !date) return errorResponse(res, 'doctorId and date are required', 400);
  if (!isValidObjectId(doctorId)) return errorResponse(res, 'Invalid doctorId', 400);
  if (!DATE_RX.test(date)) return errorResponse(res, 'Invalid date format (YYYY-MM-DD)', 400);

  // Confirm doctor exists (avoid leaking ids)
  const doctorExists = await Doctor.exists({ _id: doctorId });
  if (!doctorExists) return errorResponse(res, 'Doctor not found', 404);

  // Only pending/confirmed block the slot; cancelled/expired should be free
  const appts = await Appointment.find({
    doctorId,
    date,
    status: { $in: ['pending', 'confirmed'] },
  })
    .select('time -_id')
    .lean();

  const reserved = appts.map((a) => a.time);
  return successResponse(res, { reserved }, 'Reserved times retrieved successfully');
});

/**
 * @desc    Patient self-cancel BEFORE payment (uses cancelToken)
 * @route   POST /api/appointments/:id/cancel
 * @access  Public (rate-limited)
 */
export const cancelOwnAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { token } = req.body; 

  if (!isValidObjectId(id)) return errorResponse(res, 'Invalid appointment id', 400);
  if (!token) return errorResponse(res, 'Missing token', 400);

  const appt = await Appointment.findById(id).select('+cancelToken');
  if (!appt) return errorResponse(res, 'Appointment not found', 404);
  if (appt.cancelToken !== token) return errorResponse(res, 'Invalid token', 401);

    if (appt.status === 'cancelled') {
    return successResponse(res, null, 'Appointment already cancelled');
  }

  if (appt.paymentStatus === 'paid') {
    return errorResponse(
      res,
      'This appointment is already paid. To cancel, please contact the clinic.',
      400
    );
  }

  appt.status = 'cancelled';
  appt.cancelledAt = new Date(); 
  await appt.save();

  return successResponse(res, null, 'Appointment cancelled successfully');
});
