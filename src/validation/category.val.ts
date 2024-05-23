import { param  , body, query } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';



export const createCategoryVal = [
  body('title').isString().exists(),
  validationMiddleware
];

export const updateCategoryVal = [
  param('categoryId').isMongoId(),
  body('title').optional().isString().exists(),
  validationMiddleware
];

export const getCategoryVal = [
  param('categoryId').isMongoId(),
  validationMiddleware
];

export const getCategoriesVal = [
  query('limit').optional().isInt({min:1}),
  query('page').optional().isInt({min:1}),
  validationMiddleware
];