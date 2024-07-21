import { body, param } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';

export const Create = [
  body('name').isString().exists().withMessage('name must by string'),
  body('location.lat').isFloat({ min: -90, max: 90 }).withMessage('location lat must be number'),
  body('location.lng').isFloat({ min: -180, max: 180 }).withMessage('location lng must be number'),
  validationMiddleware,
];

export const update = [
  param('locationId').isMongoId().withMessage('location id must be mongo id'),
  body('name').optional().isString().exists().withMessage('name must by string'),
  body('location.lat')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('location lat must be number')
    .custom((val, { req }) => {
      if (req.body.location.lng) return true;
      throw new Error('location lng must be number');
    }),
  body('location.lng')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('location lng must be number')
    .custom((val, { req }) => {
      if (req.body.location.lat) return true;
      throw new Error('location lat must be number');
    }),
  validationMiddleware,
];

export const get = [
  param('locationId').isMongoId().withMessage('location id must be mongo id'),
  validationMiddleware,
];
