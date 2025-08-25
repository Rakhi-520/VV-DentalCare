import request from 'supertest'
import mongoose from 'mongoose'
import app from '../app.js'
import Service from '../models/Service.js'
import Doctor from '../models/Doctor.js'
import Appointment from '../models/Appointment.js'

describe('Appointments API', () => {
  let serviceId
  let doctorId

  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_URI)
    
    // Create test service
    const service = await Service.create({
      title: 'Test Service',
      slug: 'test-service',
      shortDescription: 'Test description',
      description: 'Test full description',
      icon: 'test-icon',
      heroImage: 'https://example.com/image.jpg',
      order: 1,
      isActive: true,
    })
    serviceId = service._id

    // Create test doctor
    const doctor = await Doctor.create({
      fullName: 'Dr. Test',
      role: 'Test Specialist',
      bio: 'Test bio',
      yearsExperience: 5,
      avatarUrl: 'https://example.com/avatar.jpg',
    })
    doctorId = doctor._id
  })

  afterAll(async () => {
    // Clean up test data
    await Service.deleteMany({ title: 'Test Service' })
    await Doctor.deleteMany({ fullName: 'Dr. Test' })
    await Appointment.deleteMany({ patientName: 'Test Patient' })
    await mongoose.connection.close()
  })

  afterEach(async () => {
    // Clean up appointments after each test
    await Appointment.deleteMany({ patientName: 'Test Patient' })
  })

  test('POST /api/appointments should create appointment successfully', async () => {
    const appointmentData = {
      patientName: 'Test Patient',
      email: 'test@example.com',
      phone: '1234567890',
      serviceId: serviceId.toString(),
      doctorId: doctorId.toString(),
      date: '2024-12-25',
      time: '10:00',
      notes: 'Test appointment',
    }

    const response = await request(app)
      .post('/api/appointments')
      .send(appointmentData)
      .expect(201)

    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Appointment created successfully')
    expect(response.body.data.patientName).toBe('Test Patient')
    expect(response.body.data.status).toBe('pending')
  })

  test('POST /api/appointments should reject duplicate time slot', async () => {
    const appointmentData = {
      patientName: 'Test Patient',
      email: 'test@example.com',
      phone: '1234567890',
      serviceId: serviceId.toString(),
      doctorId: doctorId.toString(),
      date: '2024-12-25',
      time: '10:00',
    }

    // Create first appointment
    await request(app)
      .post('/api/appointments')
      .send(appointmentData)
      .expect(201)

    // Try to create duplicate appointment
    const response = await request(app)
      .post('/api/appointments')
      .send({
        ...appointmentData,
        patientName: 'Another Patient',
        email: 'another@example.com',
      })
      .expect(409)

    expect(response.body.success).toBe(false)
    expect(response.body.error.message).toBe('Time slot is already booked')
  })

  test('POST /api/appointments should return 400 for invalid data', async () => {
    const invalidData = {
      patientName: 'T', // Too short
      email: 'invalid-email',
      phone: '123', // Too short
      serviceId: 'invalid-id',
      date: 'invalid-date',
      time: 'invalid-time',
    }

    const response = await request(app)
      .post('/api/appointments')
      .send(invalidData)
      .expect(400)

    expect(response.body.success).toBe(false)
    expect(response.body.error.message).toBe('Validation failed')
    expect(response.body.error.details).toBeDefined()
  })

  test('POST /api/appointments should work without doctorId', async () => {
    const appointmentData = {
      patientName: 'Test Patient',
      email: 'test@example.com',
      phone: '1234567890',
      serviceId: serviceId.toString(),
      date: '2024-12-26',
      time: '14:00',
    }

    const response = await request(app)
      .post('/api/appointments')
      .send(appointmentData)
      .expect(201)

    expect(response.body.success).toBe(true)
    expect(response.body.data.doctorId).toBeNull()
  })
})