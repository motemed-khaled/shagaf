import { param, body, query } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';

export const createCategoryVal = [
  body('title').isString().exists().withMessage('Title is required and must be a string'),
  validationMiddleware,
];

export const updateCategoryVal = [
  param('categoryId').isMongoId().withMessage('Invalid categoryId parameter'),
  body('title').optional().isString().exists().withMessage('Title must be a string'),
  validationMiddleware,
];

export const getCategoryVal = [
  param('categoryId').isMongoId().withMessage('Invalid categoryId parameter'),
  validationMiddleware,
];

export const getCategoriesVal = [
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  validationMiddleware,
];
