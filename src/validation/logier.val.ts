import { param, query } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';

export const validateLogierVal = [
  param('bookId').isMongoId().withMessage('invalid book id format'),
  query('user').optional().isMongoId().withMessage('Invalid user ID format'),
  query('action').optional().isString().withMessage('Action must be a string'),
  query('targetModel').optional().isString().withMessage('Target model must be a string'),
  query('targetId').optional().isMongoId().withMessage('Invalid target ID format'),
  query('startDate').optional().isISO8601().toDate().withMessage('Invalid start date format'),
  query('endDate').optional().isISO8601().toDate().withMessage('Invalid end date format'),
  query('details').optional().isString().withMessage('Details must be a string'),
  validationMiddleware,
];
