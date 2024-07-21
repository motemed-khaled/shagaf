import { body, param, query } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';

export const createProductVal = [
  body('category').isMongoId().withMessage('Category must be a valid Mongo ID'),
  body('count').isInt({ min: 1 }).withMessage('Count must be a positive integer'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a non-negative float'),
  body('title').isString().exists().withMessage('Title is required and must be a string'),
  validationMiddleware,
];

export const updateProductVal = [
  param('productId').isMongoId().withMessage('Invalid productId parameter'),
  body('category').optional().isMongoId().withMessage('Category must be a valid Mongo ID'),
  body('count').optional().isInt({ min: 1 }).withMessage('Count must be a positive integer'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a non-negative float'),
  body('title')
    .optional()
    .isString()
    .exists()
    .withMessage('Title is required and must be a string'),
  validationMiddleware,
];

export const getProductVal = [
  param('productId').isMongoId().withMessage('Invalid productId parameter'),
  validationMiddleware,
];

export const getProductsVal = [
  query('category').optional().isMongoId().withMessage('Category must be a valid Mongo ID'),
  query('priceMin').optional().isNumeric().withMessage('PriceMin must be a number').toFloat(),
  query('priceMax').optional().isNumeric().withMessage('PriceMax must be a number').toFloat(),
  query('title').optional().isString().withMessage('Title must be a string'),
  query('countMin').optional().isNumeric().withMessage('CountMin must be a number').toInt(),
  query('countMax').optional().isNumeric().withMessage('CountMax must be a number').toInt(),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  validationMiddleware,
];
