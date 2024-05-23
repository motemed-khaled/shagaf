import { body , query , param } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';





export const createEventVal = [
  body('cost').isInt({min:1}),
  body('details').isArray({min:1}),
  body('details.*').isObject(),
  body('details.*.title').isString().exists(),
  body('location').isIn(['roxy','new cairo']),
  body('title').isString().exists(),
  body('date').isISO8601().toDate().custom(val =>{
    const date = new Date(val);
    const now = new Date();  
    if (date > now) return true;
    throw new Error('invalid date');
  }),
  validationMiddleware
];

export const updateEventVal = [
  param('eventId').isMongoId(),
  body('cost').optional().isInt({min:1}),
  body('location').optional().isIn(['roxy','new cairo']),
  body('title').optional().isString().exists(),
  body('date').optional().isISO8601().toDate().custom(val =>{
    const date = new Date(val);
    const now = new Date();  
    if (date > now) return true;
    throw new Error('invalid date');
  }),
  validationMiddleware
];

export const getEventVal = [
  param('eventId').isMongoId(),
  validationMiddleware
];

export const deleteEventVal = [
  param('eventId').isMongoId(),
  validationMiddleware
];

export const getEventsVal = [
  query('title')
    .optional()
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .escape(),
  query('location')
    .optional()
    .isIn(['roxy', 'new cairo'])
    .withMessage('Location must be either "roxy" or "new cairo"'),
  query('cost')
    .optional()
    .isNumeric()
    .withMessage('Cost must be a number'),
  query('details')
    .optional()
    .isString()
    .withMessage('Details must be a string')
    .trim()
    .escape(),
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
  query('limit').optional().isInt({min:1}),
  query('page').optional().isInt({min:1}),
  validationMiddleware
];

export const deleteDetailVal = [
  param('eventId').isMongoId(),
  body('titleId').isMongoId(),
  validationMiddleware
];

export const updateDetailVal = [
  param('eventId').isMongoId(),
  body('titleId').isMongoId(),
  body('title').isString().exists(),
  validationMiddleware
];
