import { body , param, query  } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';




export const createProductVal = [
  body('category').isMongoId(),
  body('count').isInt({min:1}),
  body('price').isFloat({min:0}),
  body('title').isString().exists(),
  validationMiddleware
];

export const updateProductVal = [
  param('productId').isMongoId(),
  body('category').optional().isMongoId(),
  body('count').optional().isInt({min:1}),
  body('price').optional().isFloat({min:0}),
  body('title').optional().isString().exists(),
  validationMiddleware
];


export const getProductVal = [
  param('productId').isMongoId(),
  validationMiddleware
];

export const getProductsVal = [
  query('category')
    .optional()
    .isMongoId()
    .withMessage('Category must be a valid Mongo ID'),
    
  query('priceMin')
    .optional()
    .isNumeric()
    .withMessage('priceMin must be a number')
    .toFloat(),
  
  query('priceMax')
    .optional()
    .isNumeric()
    .withMessage('priceMax must be a number')
    .toFloat(),
  
  query('title')
    .optional()
    .isString()
    .withMessage('Title must be a string'),
  
  query('countMin')
    .optional()
    .isNumeric()
    .withMessage('countMin must be a number')
    .toInt(),
  
  query('countMax')
    .optional()
    .isNumeric()
    .withMessage('countMax must be a number')
    .toInt(),
  query('limit').optional().isInt({min:1}),
  query('page').optional().isInt({min:1}),
  validationMiddleware
];