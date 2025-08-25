
import { body, query } from 'express-validator';

export const createDoctorSchema = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('fullName is required')
    .isLength({ max: 120 }).withMessage('fullName must be <= 120 chars'),

  body('specialties')
    .optional()
    .isArray().withMessage('specialties must be an array of strings'),

  body('specialties.*')
    .optional()
    .isString().withMessage('each specialty must be a string'),

  body('email')
    .optional()
    .isEmail().withMessage('Invalid email'),

  body('phone')
    .optional()
    .isString().withMessage('phone must be a string'),

  body('bio')
    .optional()
    .isString().withMessage('bio must be a string'),

  body('avatar')
    .optional()
    .isURL().withMessage('avatar must be a valid URL'),

  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be boolean'),

  
  body('services')
    .optional()
    .isArray().withMessage('services must be an array of ids'),

  body('services.*')
    .optional()
    .isMongoId().withMessage('each service id must be a valid MongoId'),
];

export const updateDoctorSchema = [
  body('fullName')
    .optional()
    .trim()
    .notEmpty().withMessage('fullName cannot be empty')
    .isLength({ max: 120 }).withMessage('fullName must be <= 120 chars'),

  body('specialties')
    .optional()
    .isArray().withMessage('specialties must be an array of strings'),

  body('specialties.*')
    .optional()
    .isString().withMessage('each specialty must be a string'),

  body('email')
    .optional()
    .isEmail().withMessage('Invalid email'),

  body('phone')
    .optional()
    .isString().withMessage('phone must be a string'),

  body('bio')
    .optional()
    .isString().withMessage('bio must be a string'),

  body('avatar')
    .optional()
    .isURL().withMessage('avatar must be a valid URL'),

  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be boolean'),

  body('services')
    .optional()
    .isArray().withMessage('services must be an array of ids'),

  body('services.*')
    .optional()
    .isMongoId().withMessage('each service id must be a valid MongoId'),
];

export const doctorQuerySchema = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('sort').optional().isString(),


  query('serviceId').optional().isMongoId(),
  query('isActive').optional().isBoolean().toBoolean(),
  query('search').optional().isString(),
];
