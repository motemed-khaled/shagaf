import { body, param } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';





export const createSliderVal = [
  body('location').isIn(['roxy','new cairo']),
  body('rate').isInt({min:0 , max:5}),
  body('title').isString().exists(),
  validationMiddleware
];

export const updateSliderVal = [
  param('sliderId').isMongoId(),
  body('location').optional().isIn(['roxy','new cairo']),
  body('rate').optional().isInt({min:0 , max:5}),
  body('title').optional().isString().exists(),
  validationMiddleware
];

export const getSliderVal = [
  param('sliderId').isMongoId(),
  validationMiddleware
];

export const deleteSliderVal = [
  param('sliderId').isMongoId(),
  validationMiddleware
];