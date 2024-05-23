import { param  , body } from 'express-validator';

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