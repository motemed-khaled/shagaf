import { body, param, query } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';
import { MemberDurationType, MemberType } from '../models/members.model';

export const createMemberVal = [
  body('title')
    .exists()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string'),

  body('price').isFloat({ min: 1 }).withMessage('Price must be a positive number'),

  body('details').isArray({ min: 1 }).withMessage('Details must be a non-empty array'),

  body('details.*').isObject().withMessage('Each detail must be an object'),

  body('details.*.title')
    .exists()
    .withMessage('Detail title is required')
    .isString()
    .withMessage('Detail title must be a string'),

  body('duration').isInt({ min: 1 }).withMessage('Duration is required and must be an integer'),

  body('durationType')
    .isIn(Object.values(MemberDurationType))
    .withMessage('Invalid duration type')
    .custom((val, { req }) => {
      if (req.body.type === MemberType.separated && val === MemberDurationType.month) {
        throw new Error(`Duration type must be ${MemberDurationType.day}`);
      }
      return true;
    }),

  body('type')
    .isIn(Object.values(MemberType))
    .withMessage('Invalid type')
    .custom((val, { req }) => {
      if (val === MemberType.separated && !req.body.end) {
        throw new Error('End date is required for the separated type');
      }
      if (val === MemberType.continuos && req.body.end) {
        throw new Error('End date is not required for the continuos type');
      }
      return true;
    }),

  body('end')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('End date must be a valid ISO 8601 date')
    .custom((val, { req }) => {
      if (req.body.type === MemberType.separated) {
        const currentDate = new Date();
        const datePlus15Days = new Date(currentDate);
        datePlus15Days.setDate(currentDate.getDate() + req.body.duration * 2);

        if (val <= datePlus15Days) {
          throw new Error(`End date must be at least ${req.body.duration * 2} days in the future`);
        }
      }
      return true;
    }),

  validationMiddleware,
];

export const updateMemberVal = [
  param('memberId').isMongoId().withMessage('Invalid memberId parameter'),
  body('title')
    .optional()
    .exists()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string'),

  body('price').optional().isFloat({ min: 1 }).withMessage('Price must be a positive number'),

  body('details').optional().isArray({ min: 1 }).withMessage('Details must be a non-empty array'),

  body('details.*').isObject().withMessage('Each detail must be an object'),

  body('details.*.title')
    .exists()
    .withMessage('Detail title is required')
    .isString()
    .withMessage('Detail title must be a string'),

  body('duration')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Duration is required and must be an integer'),

  body('end')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('End date must be a valid ISO 8601 date')
    .custom((val, { req }) => {
      if (req.body.type === MemberType.separated) {
        const currentDate = new Date();
        const datePlus15Days = new Date(currentDate);
        datePlus15Days.setDate(currentDate.getDate() + req.body.duration * 2);

        if (val <= datePlus15Days) {
          throw new Error(`End date must be at least ${req.body.duration * 2} days in the future`);
        }
      }
      return true;
    }),
  validationMiddleware,
];

export const updateMemberDetailVal = [
  param('memberId').isMongoId().withMessage('Invalid memberId parameter'),
  body('detailId').isMongoId().withMessage('Invalid detailId parameter'),
  body('title').exists().isString().withMessage('Title is required and must be a string'),
  validationMiddleware,
];

export const deleteMemberDetailVal = [
  param('memberId').isMongoId().withMessage('Invalid memberId parameter'),
  body('detailId').isMongoId().withMessage('Invalid detailId parameter'),
  validationMiddleware,
];

export const deleteMemberVal = [
  param('memberId').isMongoId().withMessage('Invalid memberId parameter'),
  validationMiddleware,
];

export const getMemberVal = [
  param('memberId').isMongoId().withMessage('Invalid memberId parameter'),
  validationMiddleware,
];

export const getMembersVal = [
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  validationMiddleware,
];

export const memberBookVal = [
  body('member').isMongoId(),
  body('user').optional().isMongoId(),
  body('pointDiscount').optional().isBoolean().withMessage('pointDiscount must by boolean'),
  validationMiddleware,
];

export const updateBookVal = [
  param('bookId').isMongoId(),
  body('voucher').optional().isMongoId(),
  validationMiddleware,
];

export const getBookVal = [param('bookId').isMongoId(), validationMiddleware];

export const getAllBookingVal = [
  query('user').optional().isMongoId().withMessage('Invalid user ID format'),
  query('startDate').optional().isISO8601().toDate().withMessage('Invalid start date format'),
  query('endDate').optional().isISO8601().toDate().withMessage('Invalid end date format'),
  query('paid').optional().isBoolean().withMessage('Paid must be a boolean value'),
  query('limit').optional().isInt({ min: 1 }).withMessage('limit must be integer'),
  query('page').optional().isInt({ min: 1 }).withMessage('page must be integer'),
  validationMiddleware,
];


export const updateUserVal = [
  body('user').isMongoId(),
  validationMiddleware
];