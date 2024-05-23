import { body, param, query } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';


export const createPlanVal = [
  body('price').isInt({min:1}),
  body('stamp').isIn(['Hour' , 'Day' , 'Month']),
  validationMiddleware
];

export const updatePlanVal = [
  param('planId').isMongoId(),
  body('price').optional().isInt({min:1}),
  body('stamp').optional().isIn(['Hour' , 'Day' , 'Month']),
  validationMiddleware
];

export const deletePlanVal = [
  param('planId').isMongoId(),
  validationMiddleware
];

export const getPlanVal = [
  param('planId').isMongoId(),
  validationMiddleware
];

export const getPlansHandler = [
  query('limit').optional().isInt({min:1}),
  query('page').optional().isInt({min:1}),
  validationMiddleware
];