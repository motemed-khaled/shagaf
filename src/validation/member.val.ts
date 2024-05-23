import { body , param, query } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';




export const createMemberVal =[
  body('title').exists().isString(),
  body('price').isFloat({min:1}),
  body('details').isArray({min:1}),
  body('details.*').isObject(),
  body('details.*.title').exists().isString(),
  validationMiddleware
];

export const updateMemberVal =[
  param('memberId').isMongoId(),
  body('price').optional().isFloat({min:1}),
  body('title').optional().exists().isString(),
  validationMiddleware
];

export const updateMemberDetailVal =[
  param('memberId').isMongoId(),
  body('detailId').isMongoId(),
  body('title').exists().isString(),
  validationMiddleware
];

export const deleteMemberDetailVal =[
  param('memberId').isMongoId(),
  body('detailId').isMongoId(),
  validationMiddleware
];

export const deleteMemberVal =[
  param('memberId').isMongoId(),
  validationMiddleware
];

export const getMemberVal =[
  param('memberId').isMongoId(),
  validationMiddleware
];


export const getMembersVal = [
  query('limit').optional().isInt({min:1}),
  query('page').optional().isInt({min:1}),
  validationMiddleware
];