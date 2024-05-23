import { body, param, query } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';



export const createRoomVal = [
  body('location').isIn(['roxy','new cairo']),
  body('description').isString().exists(),
  body('seatsNum').isInt({min:1}),
  body('plans').isArray({min:1}),
  body('plans.*').isMongoId(),
  body('title').isString().exists(),
  body('type').isIn(['shared' , 'private']),
  validationMiddleware
];

export const UpdateRoomVal = [
  param('roomId').isMongoId(),
  body('location').optional().isIn(['roxy','new cairo']),
  body('description').optional().isString().exists(),
  body('seatsNum').optional().isInt({min:1}),
  body('plans').optional().isArray({min:1}),
  body('plans*').optional().isMongoId(),
  body('title').optional().isString().exists(),
  body('type').optional().isIn(['shared' , 'private']),
  validationMiddleware
];

export const getRoomVal = [
  param('roomId').isMongoId(),
  validationMiddleware
];

export const deleteRoomVal = [
  param('roomId').isMongoId(),
  validationMiddleware
];

export const addAmenitiesVal = [
  param('roomId').isMongoId(),
  body('title').isString().exists(),
  validationMiddleware
];

export const updateAmenitiesVal = [
  param('roomId').isMongoId(),
  body('amenityId').isMongoId(),
  body('title').optional().isString().exists(),
  validationMiddleware
];

export const deleteAmenitiesVal = [
  param('roomId').isMongoId(),
  body('amenityId').isMongoId(),
  validationMiddleware
];

export const deleteAttachmentVal = [
  param('roomId').isMongoId(),
  body('attachId').isMongoId(),
  validationMiddleware
];

export const updateAttachmentVal = [
  param('roomId').isMongoId(),
  body('attachId').isMongoId(),
  validationMiddleware
];

export const addAttachmentVal = [
  param('roomId').isMongoId(),
  validationMiddleware
];

export const getRoomsVal = [
  query('location').optional().isString().withMessage('Location must be a string.'),
  query('seatsAvailable').optional().isInt({ min: 0 }).withMessage('Seats Available must be a non-negative integer.'),
  query('seatsNum').optional().isInt({ min: 0 }).withMessage('Seats Num must be a non-negative integer.'),
  query('description').optional().isString().withMessage('Description must be a string.'),
  query('title').optional().isString().withMessage('Title must be a string.'),
  query('limit').optional().isInt({min:1}).withMessage('limit must be a integer.'),
  query('page').optional().isInt({min:1}).withMessage('page must be a integer.'),
  validationMiddleware
];