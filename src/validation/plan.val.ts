import { body, param, query } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';


export const createPlanVal = [
  body('price').isInt({ min: 1 }).withMessage('Price must be a positive integer'),
  body('stamp').isIn(['Hour', 'Day', 'Month']).withMessage('Stamp must be one of: Hour, Day, Month'),
  validationMiddleware
];

export const updatePlanVal = [
  param('planId').isMongoId().withMessage('Invalid planId parameter'),
  body('price').optional().isFloat({ min: 1 }).withMessage('Price must be a positive integer'),
  body('stamp').optional().isIn(['Hour', 'Day', 'Month']).withMessage('Stamp must be one of: Hour, Day, Month'),
  validationMiddleware
];

export const deletePlanVal = [
  param('planId').isMongoId().withMessage('Invalid planId parameter'),
  validationMiddleware
];

export const getPlanVal = [
  param('planId').isMongoId().withMessage('Invalid planId parameter'),
  validationMiddleware
];

export const getPlansHandler = [
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  validationMiddleware
];
