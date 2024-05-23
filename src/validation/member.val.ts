import { body , param, query } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';


export const createMemberVal = [
  body('title').exists().isString().withMessage('Title is required and must be a string'),
  body('price').isFloat({ min: 1 }).withMessage('Price must be a positive number'),
  body('details').isArray({ min: 1 }).withMessage('Details must be a non-empty array'),
  body('details.*').isObject().withMessage('Each detail must be an object'),
  body('details.*.title').exists().isString().withMessage('Detail title is required and must be a string'),
  validationMiddleware
];

export const updateMemberVal = [
  param('memberId').isMongoId().withMessage('Invalid memberId parameter'),
  body('price').optional().isFloat({ min: 1 }).withMessage('Price must be a positive number'),
  body('title').optional().exists().isString().withMessage('Title must be a string'),
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
