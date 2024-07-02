import { body, param } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';



export const Create = [
  body('name').isString().exists().withMessage('name must by string'),
  validationMiddleware
];

export const update = [
  param('locationId').isMongoId().withMessage('location id must be mongo id'),
  body('name').isString().exists().withMessage('name must by string'),
  validationMiddleware
];

export const get = [
  param('locationId').isMongoId().withMessage('location id must be mongo id'),
  validationMiddleware
];