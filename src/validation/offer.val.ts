import { body , query , param } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';



export const createOfferVal = [
  body('bookingNum').isInt({ min: 1 }).withMessage('Booking number must be a positive integer'),
  body('discount').isInt({ min: 1, max: 100 }).withMessage('Discount must be an integer between 1 and 100'),
  body('from').isISO8601().toDate().custom((val, { req }) => {
    if (!req.body.to)
      throw new Error('To date is required');
    const from = new Date(val);
    const now = new Date();
    if (from < now)
      throw new Error('From date cannot be in the past');
    return true;
  }).withMessage('Invalid from date'),
  body('to').isISO8601().toDate().custom((val, { req }) => {
    if (!req.body.from)
      throw new Error('From date is required');
    const to = new Date(val);
    const from = new Date(req.body.from);
    if (to <= from)
      throw new Error('To date must be after from date');
    return true;
  }).withMessage('Invalid to date'),
  body('name').isString().exists().withMessage('Name is required and must be a string'),
  body('title').isString().exists().withMessage('Title is required and must be a string'),
  body('users').isArray({ min: 1 }).withMessage('Users must be a non-empty array'),
  body('users.*').isMongoId().withMessage('Invalid user ID'),
  validationMiddleware
];

export const UpdateOfferVal = [
  param('offerId').isMongoId().withMessage('Invalid offer ID'),
  body('bookingNum').optional().isInt({ min: 1 }).withMessage('Booking number must be a positive integer'),
  body('discount').optional().isInt({ min: 1, max: 100 }).withMessage('Discount must be an integer between 1 and 100'),
  body('from').optional().isISO8601().toDate().custom((val, { req }) => {
    if (!req.body.to)
      throw new Error('To date is required');
    const from = new Date(val);
    const now = new Date();
    if (from < now)
      throw new Error('From date cannot be in the past');
    return true;
  }).withMessage('Invalid from date'),
  body('to').optional().isISO8601().toDate().custom((val, { req }) => {
    if (!req.body.from)
      throw new Error('From date is required');
    const to = new Date(val);
    const from = new Date(req.body.from);
    if (to <= from)
      throw new Error('To date must be after from date');
    return true;
  }).withMessage('Invalid to date'),
  body('name').optional().isString().exists().withMessage('Name must be a string'),
  body('title').optional().isString().exists().withMessage('Title must be a string'),
  body('users').optional().isArray({ min: 1 }).withMessage('Users must be a non-empty array'),
  body('users.*').optional().isMongoId().withMessage('Invalid user ID'),
  validationMiddleware
];

export const getOfferVal = [
  param('offerId').isMongoId().withMessage('Invalid offer ID'),
  validationMiddleware
];

export const deleteOfferVal = [
  param('offerId').isMongoId().withMessage('Invalid offer ID'),
  validationMiddleware
];

export const getOffersVal = [
  query('title').optional().isString().withMessage('Title must be a string'),
  query('name').optional().isString().withMessage('Name must be a string'),
  query('discount').optional().isNumeric().withMessage('Discount must be a number'),
  query('bookingNum').optional().isNumeric().withMessage('Booking number must be a number'),
  query('from').optional().isISO8601().toDate().withMessage('From date must be a valid ISO8601 date'),
  query('to').optional().isISO8601().toDate().withMessage('To date must be a valid ISO8601 date'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  validationMiddleware
];

export const getUsersOfferVal = [
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  validationMiddleware
];
