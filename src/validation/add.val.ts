import { param } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';




export const getAddVal = [
  param('addId').isMongoId(),
  validationMiddleware
];

export const deleteAddVal = [
  param('addId').isMongoId(),
  validationMiddleware
];