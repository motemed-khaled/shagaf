import { body , query , param } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';



export const createOfferVal = [
  body('bookingNum').isInt({min:1}),
  body('discount').isInt({min:1 , max:100}),
  body('from').isISO8601().toDate().custom((val , {req})=>{
    if (!req.body.to)
      throw new Error('to date required');
    const from = new Date(req.body.from);
    const now = new Date();
    if (from < now) 
      throw new Error('invalid from date');
    return true;
  }),
  body('to').isISO8601().toDate().custom((val , {req})=>{
    if (!req.body.from)
      throw new Error('from date required');
    const to = new Date(req.body.to);
    const from = new Date(req.body.from);
    if (to <= from) 
      throw new Error('invalid to date');
    return true;
  }),
  body('name').isString().exists(),
  body('title').isString().exists(),
  body('users').isArray({min:1}),
  body('users.*').isMongoId(),
  validationMiddleware
];

export const UpdateOfferVal = [
  param('offerId').isMongoId(),
  body('bookingNum').optional().isInt({min:1}),
  body('discount').optional().isInt({min:1 , max:100}),
  body('from').optional().isISO8601().toDate().custom((val , {req})=>{
    if (!req.body.to)
      throw new Error('to date required');
    const from = new Date(req.body.from);
    const now = new Date();    
    if (from < now) 
      throw new Error('invalid from date');
    return true;
  }),
  body('to').optional().isISO8601().toDate().custom((val , {req})=>{
    if (!req.body.from)
      throw new Error('from date required');
    const to = new Date(req.body.to);
    const from = new Date(req.body.from);
    if (to <= from) 
      throw new Error('invalid to date');
    return true;
  }),
  body('name').optional().isString().exists(),
  body('title').optional().isString().exists(),
  body('users').optional().isArray({min:1}),
  body('users.*').isMongoId(),
  validationMiddleware
];

export const getOfferVal = [
  param('offerId').isMongoId(),
  validationMiddleware
];

export const deleteOfferVal = [
  param('offerId').isMongoId(),
  validationMiddleware
];

export const getOffersVal = [
  query('title').optional().isString(),
  query('name').optional().isString(),
  query('discount').optional().isNumeric(),
  query('bookingNum').optional().isNumeric(),
  query('from').optional().isISO8601().toDate(),
  query('to').optional().isISO8601().toDate(),
  validationMiddleware
];