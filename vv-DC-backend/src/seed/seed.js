import '../config/env.js'
import { connectDB } from '../db/connect.js'
import { logger } from '../config/logger.js'

// Import models
import Admin from '../models/Admin.js'
import Service from '../models/Service.js'
import Doctor from '../models/Doctor.js'
import Testimonial from '../models/Testimonial.js'
import Faq from '../models/Faq.js'
import Blog from '../models/Blog.js'
import Asset from '../models/Asset.js'

// Import seed data
import {
  adminData,
  servicesData,
  doctorsData,
  testimonialsData,
  faqsData,
  blogData,
  galleryData,
} from './data.js'

async function seedDatabase() {
  try {
    await connectDB()
    logger.info('Connected to database for seeding')

    // Clear existing data
    await Promise.all([
      Admin.deleteMany({}),
      Service.deleteMany({}),
      Doctor.deleteMany({}),
      Testimonial.deleteMany({}),
      Faq.deleteMany({}),
      Blog.deleteMany({}),
      Asset.deleteMany({}),
    ])
    logger.info('Cleared existing data')

    // Seed admin
    await Admin.create(adminData)
    logger.info('Admin user created')

    // Seed services
    await Service.insertMany(servicesData)
    logger.info('Services seeded')

    // Seed doctors
    await Doctor.insertMany(doctorsData)
    logger.info('Doctors seeded')

    // Seed testimonials
    await Testimonial.insertMany(testimonialsData)
    logger.info('Testimonials seeded')

    // Seed FAQs
    await Faq.insertMany(faqsData)
    logger.info('FAQs seeded')

    // Seed blog posts
    await Blog.insertMany(blogData)
    logger.info('Blog posts seeded')

    // Seed gallery assets
    await Asset.insertMany(galleryData)
    logger.info('Gallery assets seeded')

    logger.info('Database seeding completed successfully!')
    logger.info('Admin login: admin@dental.local / admin123')
    
    process.exit(0)
  } catch (error) {
    logger.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()