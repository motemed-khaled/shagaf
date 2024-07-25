import { body, param, query } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';

export const createRoom = [
  body('description').exists().isString().withMessage('Description must be a string'),

  body('location').isMongoId().withMessage('Location must be a valid Mongo ID'),

  body('packages').isArray({ min: 1 }).withMessage('Packages must be an array'),
  body('packages.*').isMongoId().withMessage('Each package must be a valid Mongo ID'),

  body('plans').isArray({ min: 1 }).withMessage('Plans must be an array'),
  body('plans.*').isMongoId().withMessage('Each plan must be a valid Mongo ID'),

  body('seatsNum').isInt({ min: 1 }).withMessage('Seats number must be a non-negative integer'),

  body('title').exists().isString().withMessage('Title must be a string'),
  body('birthDay').optional().isBoolean().toBoolean().withMessage('Title must be a string'),
  validationMiddleware,
];

export const updateRoom = [
  param('roomId').isMongoId(),
  body('description').optional().exists().isString().withMessage('Description must be a string'),

  body('location').optional().isMongoId().withMessage('Location must be a valid Mongo ID'),

  body('packages').optional().isArray({ min: 1 }).withMessage('Packages must be an array'),
  body('packages.*').isMongoId().withMessage('Each package must be a valid Mongo ID'),

  body('plans').optional().isArray({ min: 1 }).withMessage('Plans must be an array'),
  body('plans.*').isMongoId().withMessage('Each plan must be a valid Mongo ID'),

  body('seatsNum')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Seats number must be a non-negative integer'),

  body('title').optional().exists().isString().withMessage('Title must be a string'),
  body('birthDay').optional().isBoolean().toBoolean().withMessage('Title must be a string'),
  validationMiddleware,
];

export const addAmenitiesVal = [
  param('roomId').isMongoId(),
  body('title').exists().isString(),
  validationMiddleware,
];

export const updateAmenitiesVal = [
  param('roomId').isMongoId(),
  param('amenitiesId').isMongoId(),
  body('title').optional().exists().isString(),
  validationMiddleware,
];

export const deleteAmenitiesVal = [
  param('roomId').isMongoId(),
  param('amenitiesId').isMongoId(),
  validationMiddleware,
];

export const getOne = [param('roomId').isMongoId(), validationMiddleware];

export const getAll = [
  query('limit').optional().isInt({ min: 1 }),
  query('page').optional().isInt({ min: 1 }),
  query('searchKeywords').optional().isArray().withMessage('Search keywords must be an array'),
  query('location').optional().isMongoId().withMessage('Location must be a valid MongoDB ObjectId'),
  query('plans').optional().isMongoId().withMessage('Plans must be a valid MongoDB ObjectId'),
  query('packages').optional().isMongoId().withMessage('Packages must be a valid MongoDB ObjectId'),
  query('seatsAvailableMin')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Seats available min must be a non-negative integer'),
  query('seatsAvailableMax')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Seats available max must be a non-negative integer'),
  query('seatsNumMin')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Seats number min must be a non-negative integer'),
  query('seatsNumMax')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Seats number max must be a non-negative integer'),
  query('birthDay').optional().isBoolean().toBoolean().withMessage('BirthDay must be a boolean'),
  validationMiddleware,
];
