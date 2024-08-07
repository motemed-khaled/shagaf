import { body, query, param } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';

export const createEventVal = [
  body('cost').isInt({ min: 1 }).withMessage('Cost must be a positive integer'),
  body('details').isArray({ min: 1 }).withMessage('Details must be a non-empty array'),
  body('details.*').isObject().withMessage('Each detail must be an object'),
  body('details.*.title')
    .isString()
    .exists()
    .withMessage('Detail title is required and must be a string'),
  body('location').isMongoId().withMessage('Location must mongo id'),
  body('title').isString().exists().withMessage('Title is required and must be a string'),
  body('date')
    .isISO8601()
    .toDate()
    .withMessage('Date must be a valid ISO8601 date')
    .custom((val) => {
      const date = new Date(val);
      const now = new Date();
      if (date > now) return true;
      throw new Error('Date must be in the future');
    }),
  validationMiddleware,
];

export const updateEventVal = [
  param('eventId').isMongoId().withMessage('Invalid eventId parameter'),
  body('cost').optional().isInt({ min: 1 }).withMessage('Cost must be a positive integer'),
  body('location').optional().isMongoId().withMessage('Location must mongo id'),
  body('title').optional().isString().exists().withMessage('Title must be a string'),
  body('date')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Date must be a valid ISO8601 date')
    .custom((val) => {
      const date = new Date(val);
      const now = new Date();
      if (date > now) return true;
      throw new Error('Date must be in the future');
    }),
  validationMiddleware,
];

export const getEventVal = [
  param('eventId').isMongoId().withMessage('Invalid eventId parameter'),
  validationMiddleware,
];

export const deleteEventVal = [
  param('eventId').isMongoId().withMessage('Invalid eventId parameter'),
  validationMiddleware,
];

export const getEventsVal = [
  query('title').optional().isString().withMessage('Title must be a string').trim().escape(),
  query('location').optional().isMongoId().withMessage('Location must mongo id'),
  query('cost').optional().isNumeric().withMessage('Cost must be a number'),
  query('details').optional().isString().withMessage('Details must be a string').trim().escape(),
  query('startDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Start date must be a valid ISO8601 date'),
  query('endDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('End date must be a valid ISO8601 date'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  validationMiddleware,
];

export const deleteDetailVal = [
  param('eventId').isMongoId().withMessage('Invalid eventId parameter'),
  body('titleId').isMongoId().withMessage('Invalid titleId parameter'),
  validationMiddleware,
];

export const updateDetailVal = [
  param('eventId').isMongoId().withMessage('Invalid eventId parameter'),
  body('titleId').isMongoId().withMessage('Invalid titleId parameter'),
  body('title').isString().exists().withMessage('Title is required and must be a string'),
  validationMiddleware,
];

export const eventBookVal = [
  body('event').isMongoId(),
  body('user').optional().isMongoId(),
  body('stuffDiscount').optional().isBoolean().withMessage('stuffDiscount must by boolean'),
  body('pointDiscount').optional().isInt({ min: 1 }).withMessage('pointDiscount must by integer'),
  validationMiddleware,
];

export const getEventBookVal = [param('bookId').isMongoId(), validationMiddleware];

export const getEventsBookVal = [
  query('user').optional().isMongoId().withMessage('Invalid user ID'),
  query('event').optional().isMongoId().withMessage('Invalid event ID'),
  query('date').optional().isISO8601().toDate().withMessage('Invalid date'),
  query('totalPriceMin')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Total price minimum must be a positive number'),
  query('totalPriceMax')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Total price maximum must be a positive number'),
  validationMiddleware,
];

export const updateBookVal = [
  param('bookId').isMongoId(),
  body('voucher').isMongoId(),
  validationMiddleware,
];
