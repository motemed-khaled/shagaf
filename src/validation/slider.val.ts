import { body, param } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';





export const createSliderVal = [
  body('location').isIn(['roxy', 'new cairo']).withMessage('Location must be either "roxy" or "new cairo"'),
  body('rate').isInt({ min: 0, max: 5 }).withMessage('Rate must be an integer between 0 and 5'),
  body('title').isString().exists().withMessage('Title is required and must be a string'),
  validationMiddleware
];

export const updateSliderVal = [
  param('sliderId').isMongoId().withMessage('Invalid slider ID'),
  body('location').optional().isIn(['roxy', 'new cairo']).withMessage('Location must be either "roxy" or "new cairo"'),
  body('rate').optional().isInt({ min: 0, max: 5 }).withMessage('Rate must be an integer between 0 and 5'),
  body('title').optional().isString().exists().withMessage('Title is required and must be a string'),
  validationMiddleware
];

export const getSliderVal = [
  param('sliderId').isMongoId().withMessage('Invalid slider ID'),
  validationMiddleware
];

export const deleteSliderVal = [
  param('sliderId').isMongoId().withMessage('Invalid slider ID'),
  validationMiddleware
];
