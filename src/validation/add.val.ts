import { param } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';




export const getAddVal = [
  param('addId').isMongoId().withMessage('Invalid addId parameter'),
  validationMiddleware
];

export const deleteAddVal = [
  param('addId').isMongoId().withMessage('Invalid addId parameter'),
  validationMiddleware
];