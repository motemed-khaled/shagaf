import { body , param , query } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';



export const createDayVal = [
  body('price').isInt({ min: 1 }).withMessage('Price must be a positive integer'),
  body('title').isString().exists().withMessage('Title is required and must be a string'),
  body('type').isIn(['cake', 'decoration', 'session']).withMessage('Type must be one of "cake", "decoration", or "session"'),
  validationMiddleware
];

export const updateDayVal = [
  param('dayId').isMongoId().withMessage('Invalid dayId parameter'),
  body('price').optional().isInt({ min: 1 }).withMessage('Price must be a positive integer'),
  body('title').optional().isString().exists().withMessage('Title must be a string'),
  body('type').optional().isIn(['cake', 'decoration', 'session']).withMessage('Type must be one of "cake", "decoration", or "session"'),
  validationMiddleware
];

export const getDayVal = [
  param('dayId').isMongoId().withMessage('Invalid dayId parameter'),
  validationMiddleware
];

export const deleteDayVal = [
  param('dayId').isMongoId().withMessage('Invalid dayId parameter'),
  validationMiddleware
];

export const getDaysVal = [
  query('type').optional().isString().isIn(['cake', 'decoration', 'session']).withMessage('Type must be either "cake", "decoration", or "session"'),
  query('title').optional().isString().withMessage('Title must be a string'),
  query('priceMin').optional().isNumeric().withMessage('priceMin must be a number').toFloat(),
  query('priceMax').optional().isNumeric().withMessage('priceMax must be a number').toFloat(),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  validationMiddleware
];

