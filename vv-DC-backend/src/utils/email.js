import nodemailer from 'nodemailer'
import { logger } from '../config/logger.js'
import { config } from '../config/env.js'

/**
 * Email service for sending notifications
 */
class EmailService {
  constructor() {
    this.transporter = null
    this.initializeTransporter()
  }

  async initializeTransporter() {
    try {
      if (config.smtp.host && config.smtp.user && config.smtp.pass) {
        this.transporter = nodemailer.createTransporter({
          host: config.smtp.host,
          port: config.smtp.port,
          secure: config.smtp.port === 465,
          auth: {
            user: config.smtp.user,
            pass: config.smtp.pass,
          },
        })

        // Verify connection
        await this.transporter.verify()
        logger.info('Email service initialized successfully')
      } else {
        logger.warn('Email service not configured - using console fallback')
      }
    } catch (error) {
      logger.warn('Email service initialization failed:', error.message)
      this.transporter = null
    }
  }

  async sendEmail({ to, subject, html, text }) {
    try {
      if (this.transporter) {
        const mailOptions = {
          from: `"Dental Clinic" <${config.smtp.user}>`,
          to,
          subject,
          html,
          text,
        }

        const result = await this.transporter.sendMail(mailOptions)
        logger.info(`Email sent to ${to}:`, result.messageId)
        return { success: true, messageId: result.messageId }
      } else {
        // Console fallback for development
        logger.info('EMAIL FALLBACK - Would send email:', {
          to,
          subject,
          html,
          text,
        })
        return { success: true, messageId: 'console-fallback' }
      }
    } catch (error) {
      logger.error('Failed to send email:', error)
      throw error
    }
  }

 async sendAppointmentConfirmation(appointment, service, doctor, options = {}) {
  const { cancelUrl } = options;

  const subject = 'Appointment Confirmation - Dental Clinic';

  const html = `
    <h2>Appointment Confirmation</h2>
    <p>Dear ${appointment.patientName},</p>
    <p>Your appointment has been successfully scheduled!</p>
    
    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3>Appointment Details</h3>
      <p><strong>Service:</strong> ${service.title}</p>
      ${doctor ? `<p><strong>Doctor:</strong> ${doctor.fullName}</p>` : ''}
      <p><strong>Date:</strong> ${appointment.date}</p>
      <p><strong>Time:</strong> ${appointment.time}</p>
      ${appointment.notes ? `<p><strong>Notes:</strong> ${appointment.notes}</p>` : ''}
    </div>

    ${
      cancelUrl
        ? `<p><strong>Need to cancel?</strong> If you haven't completed payment yet, you can cancel your appointment using this secure link:<br/>
           <a href="${cancelUrl}" style="color:#0b5fff;">Cancel Appointment</a></p>`
        : ''
    }
    
    <p>Please arrive 15 minutes before your appointment time.</p>
    <p>If you need to reschedule or cancel after payment, please contact the clinic.</p>
    
    <p>Best regards,<br/>Dental Clinic Team</p>
  `;

  const text = `Appointment Confirmation

Service: ${service.title}
${doctor ? `Doctor: ${doctor.fullName}\n` : ''}Date: ${appointment.date}
Time: ${appointment.time}
${appointment.notes ? `Notes: ${appointment.notes}\n` : ''}${
    cancelUrl ? `Cancel (before payment): ${cancelUrl}\n` : ''
  }
Please arrive 15 minutes early. For changes after payment, contact the clinic.`;

  return this.sendEmail({
    to: appointment.email,
    subject,
    html,
    text,
  });
}

  async sendContactMessage({ name, email, subject, message }) {
    const emailSubject = `Contact Form: ${subject}`
    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        ${message}
      </div>
    `

    return this.sendEmail({
      to: config.smtp.user, // Send to clinic email
      subject: emailSubject,
      html,
      text: `Contact from ${name} (${email}): ${message}`,
    })
  }
}

export const emailService = new EmailService()