import { body, query } from 'express-validator';

export const createServiceSchema = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 120 })
    .withMessage('Title must be <= 120 characters'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  body('durationMinutes')
    .optional()
    .isInt({ min: 1, max: 600 })
    .withMessage('durationMinutes must be between 1 and 600'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be boolean'),

  body('slug')
    .optional()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('slug must be kebab-case (letters/numbers/dashes)'),
];


export const updateServiceSchema = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 120 })
    .withMessage('Title must be <= 120 characters'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  body('durationMinutes')
    .optional()
    .isInt({ min: 1, max: 600 })
    .withMessage('durationMinutes must be between 1 and 600'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be boolean'),

  body('slug')
    .optional()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('slug must be kebab-case (letters/numbers/dashes)'),
];

/**
 * Query validators for GET /api/services
 */
export const serviceQuerySchema = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('sort').optional().isString(),
  query('search').optional().isString(),
  query('isActive').optional().isBoolean().toBoolean(),
];


