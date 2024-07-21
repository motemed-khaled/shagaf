import { body, param, query } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';

export const create = [
  body('title').isString().exists().bail(),
  body('duration').isInt({ min: 1 }).bail(),
  body('extraPrice').isInt({ min: 1 }).bail(),
  body('price').isInt({ min: 1 }).bail(),
  body('products').isArray({ min: 1 }),
  body('products.*').isObject(),
  body('products.*.product').isMongoId(),
  body('products.*.count').isInt({ min: 1 }),
  validationMiddleware,
];

export const update = [
  param('packageId').isMongoId(),
  body('title').optional().isString().exists().bail(),
  body('duration').optional().isInt({ min: 1 }).bail(),
  body('extraPrice').optional().isInt({ min: 1 }).bail(),
  body('price').optional().isInt({ min: 1 }).bail(),
  body('products').optional().isArray({ min: 1 }),
  body('products.*').isObject(),
  body('products.*.product').isMongoId(),
  body('products.*.count').isInt({ min: 1 }),
  validationMiddleware,
];

export const getOne = [param('packageId').isMongoId(), validationMiddleware];

export const getAll = [
  query('limit').optional().isInt({ min: 1 }),
  query('page').optional().isInt({ min: 1 }),
];
