import { body , param , query } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';





export const createDayVal = [
  body('price').isInt({min:1}),
  body('title').isString().exists(),
  body('type').isIn(['cake' , 'decoration' , 'session']),
  validationMiddleware
];

export const updateDayVal = [
  param('dayId').isMongoId(),
  body('price').optional().isInt({min:1}),
  body('title').optional().isString().exists(),
  body('type').optional().isIn(['cake' , 'decoration' , 'session']),
  validationMiddleware
];

export const getDayVal = [
  param('dayId').isMongoId(),
  validationMiddleware
];

export const deleteDayVal = [
  param('dayId').isMongoId(),
  validationMiddleware
];

export const getDaysVal = [
  query('type')
    .optional()
    .isString()
    .isIn(['cake', 'decoration'])
    .withMessage('Type must be either "cake" or "decoration"'),
  
  query('title')
    .optional()
    .isString()
    .withMessage('Title must be a string'),

  query('priceMin')
    .optional()
    .isNumeric()
    .withMessage('priceMin must be a number')
    .toFloat(),

  query('priceMax')
    .optional()
    .isNumeric()
    .withMessage('priceMax must be a number')
    .toFloat(),
  validationMiddleware
];
