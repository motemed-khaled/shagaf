import { body , param , query } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';



export const createDayVal = [
  body('price').isInt({ min: 1 }).withMessage('Price must be a positive integer'),
  body('title').isString().exists().withMessage('Title is required and must be a string'),
  body('type').isIn(['cake', 'decoration', 'session']).withMessage('Type must be one of "cake", "decoration", or "session"'),
  validationMiddleware
];

export const updateDayVal = [
  param('dayId').isMongoId().withMessage('Invalid dayId parameter'),
  body('price').optional().isInt({ min: 1 }).withMessage('Price must be a positive integer'),
  body('title').optional().isString().exists().withMessage('Title must be a string'),
  body('type').optional().isIn(['cake', 'decoration', 'session']).withMessage('Type must be one of "cake", "decoration", or "session"'),
  validationMiddleware
];

export const getDayVal = [
  param('dayId').isMongoId().withMessage('Invalid dayId parameter'),
  validationMiddleware
];

export const deleteDayVal = [
  param('dayId').isMongoId().withMessage('Invalid dayId parameter'),
  validationMiddleware
];

export const getDaysVal = [
  query('type').optional().isString().isIn(['cake', 'decoration', 'session']).withMessage('Type must be either "cake", "decoration", or "session"'),
  query('title').optional().isString().withMessage('Title must be a string'),
  query('priceMin').optional().isNumeric().withMessage('priceMin must be a number').toFloat(),
  query('priceMax').optional().isNumeric().withMessage('priceMax must be a number').toFloat(),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  validationMiddleware
];

export const dayBookVal = [
  body('user').isMongoId(),
  body('startDate').isISO8601().custom((val)=>{
    const date = new Date(val);
    const now = new Date();
    if (date > now) return true;
    throw new Error('start date must be in the future');
  }),
  body('endDate').isISO8601().custom((val , {req})=>{
    const date = new Date(val);
    const start = new Date(req.body.startDate);
    if (date > start) return true;
    throw new Error('end date must be Greater than start date');
  }),
  body('products').isArray({min:1}),
  body('products.*').isObject(),
  body('products.*.count').isInt({min:1}),
  body('products.*.product').isMongoId(),
  body('stuffDiscount').optional().isBoolean().withMessage('stuffDiscount must by boolean'),
  body('pointDiscount').optional().isInt({min:1}).withMessage('pointDiscount must by integer'),
  body('totalPrice').not().exists(),
  body('paid').not().exists(),
  validationMiddleware
];

export const UpdateDayBookVal = [
  param('bookId').isMongoId(),
  body('startDate').isISO8601().custom((val)=>{
    const date = new Date(val);
    const now = new Date();
    if (date > now) return true;
    throw new Error('start date must be in the future');
  }),
  body('endDate').isISO8601().custom((val , {req})=>{
    const date = new Date(val);
    const start = new Date(req.body.startDate);
    if (date > start) return true;
    throw new Error('end date must be Greater than start date');
  }),
  body('totalPrice').not().exists(),
  body('paid').not().exists(),
  body('products').not().exists(),
  validationMiddleware
];

export const getBookVal = [
  param('bookId').isMongoId(),
  validationMiddleware
];

export const getAllBookingVal = [
  query('user').optional().isMongoId().withMessage('Invalid user ID'),
  query('voucher').optional().isMongoId().withMessage('Invalid voucher ID'),
  query('startDate').optional().isISO8601().toDate().withMessage('Invalid start date'),
  query('endDate').optional().isISO8601().toDate().withMessage('Invalid end date'),
  query('totalPriceMin').optional().isFloat({ min: 0 }).withMessage('Total price minimum must be a positive number'),
  query('totalPriceMax').optional().isFloat({ min: 0 }).withMessage('Total price maximum must be a positive number'),
  query('paid').optional().isBoolean().withMessage('Paid must be a boolean'),
  validationMiddleware
];