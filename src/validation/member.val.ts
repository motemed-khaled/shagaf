import { body , param, query } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';


export const createMemberVal = [
  body('title').exists().isString().withMessage('Title is required and must be a string'),
  body('price').isFloat({ min: 1 }).withMessage('Price must be a positive number'),
  body('details').isArray({ min: 1 }).withMessage('Details must be a non-empty array'),
  body('details.*').isObject().withMessage('Each detail must be an object'),
  body('details.*.title').exists().isString().withMessage('Detail title is required and must be a string'),
  body('duration').isInt({min:1}).withMessage('duration is required and must be a integer'),
  body('durationType').isIn(['Day' , 'Month' , 'Year']).withMessage('durationType must be one of this Day Month Year'),
  validationMiddleware
];

export const updateMemberVal = [
  param('memberId').isMongoId().withMessage('Invalid memberId parameter'),
  body('price').optional().isFloat({ min: 1 }).withMessage('Price must be a positive number'),
  body('title').optional().exists().isString().withMessage('Title must be a string'),
  body('duration').optional().isInt({min:1}).withMessage('duration is required and must be a integer'),
  body('durationType').optional().isIn(['Day' , 'Month' , 'Year']).withMessage('durationType must be one of this Day Month Year'),
  validationMiddleware
];

export const updateMemberDetailVal = [
  param('memberId').isMongoId().withMessage('Invalid memberId parameter'),
  body('detailId').isMongoId().withMessage('Invalid detailId parameter'),
  body('title').exists().isString().withMessage('Title is required and must be a string'),
  validationMiddleware
];

export const deleteMemberDetailVal = [
  param('memberId').isMongoId().withMessage('Invalid memberId parameter'),
  body('detailId').isMongoId().withMessage('Invalid detailId parameter'),
  validationMiddleware
];

export const deleteMemberVal = [
  param('memberId').isMongoId().withMessage('Invalid memberId parameter'),
  validationMiddleware
];

export const getMemberVal = [
  param('memberId').isMongoId().withMessage('Invalid memberId parameter'),
  validationMiddleware
];

export const getMembersVal = [
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  validationMiddleware
];


export const memberBookVal = [
  body('member').isMongoId(),
  body('user').optional().isMongoId(),
  body('start').isISO8601().toDate(),
  body('stuffDiscount').optional().isBoolean().withMessage('stuffDiscount must by boolean'),
  body('pointDiscount').optional().isInt({min:1}).withMessage('pointDiscount must by integer'),
  validationMiddleware
];

export const updateBookVal = [
  param('bookId').isMongoId(),
  body('start').optional().isISO8601().toDate(),
  validationMiddleware
];

export const getBookVal = [
  param('bookId').isMongoId(),
  validationMiddleware
];

export const getAllBookingVal = [
  query('user').optional().isMongoId().withMessage('Invalid user ID format'),
  query('startDate').optional().isISO8601().toDate().withMessage('Invalid start date format'),
  query('endDate').optional().isISO8601().toDate().withMessage('Invalid end date format'),
  query('paid').optional().isBoolean().withMessage('Paid must be a boolean value'),
  query('limit').optional().isInt({min:1}).withMessage('limit must be integer'),
  query('page').optional().isInt({min:1}).withMessage('page must be integer'),
  validationMiddleware
];