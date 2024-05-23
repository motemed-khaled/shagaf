import { body, param, query } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';



export const createRoomVal = [
  body('location').isIn(['roxy', 'new cairo']).withMessage('Location must be either "roxy" or "new cairo"'),
  body('description').isString().exists().withMessage('Description is required and must be a string'),
  body('seatsNum').isInt({ min: 1 }).withMessage('Seats number must be a positive integer'),
  body('plans').isArray({ min: 1 }).withMessage('Plans must be a non-empty array'),
  body('plans.*').isMongoId().withMessage('Invalid plan ID in plans array'),
  body('title').isString().exists().withMessage('Title is required and must be a string'),
  body('type').isIn(['shared', 'private']).withMessage('Type must be either "shared" or "private"'),
  validationMiddleware
];

export const UpdateRoomVal = [
  param('roomId').isMongoId().withMessage('Invalid room ID'),
  body('location').optional().isIn(['roxy', 'new cairo']).withMessage('Location must be either "roxy" or "new cairo"'),
  body('description').optional().isString().exists().withMessage('Description must be a string'),
  body('seatsNum').optional().isInt({ min: 1 }).withMessage('Seats number must be a positive integer'),
  body('plans').optional().isArray({ min: 1 }).withMessage('Plans must be a non-empty array'),
  body('plans.*').optional().isMongoId().withMessage('Invalid plan ID in plans array'),
  body('title').optional().isString().exists().withMessage('Title is required and must be a string'),
  body('type').optional().isIn(['shared', 'private']).withMessage('Type must be either "shared" or "private"'),
  validationMiddleware
];

export const getRoomVal = [
  param('roomId').isMongoId().withMessage('Invalid room ID'),
  validationMiddleware
];

export const deleteRoomVal = [
  param('roomId').isMongoId().withMessage('Invalid room ID'),
  validationMiddleware
];

export const addAmenitiesVal = [
  param('roomId').isMongoId().withMessage('Invalid room ID'),
  body('title').isString().exists().withMessage('Title is required and must be a string'),
  validationMiddleware
];

export const updateAmenitiesVal = [
  param('roomId').isMongoId().withMessage('Invalid room ID'),
  body('amenityId').isMongoId().withMessage('Invalid amenity ID'),
  body('title').optional().isString().exists().withMessage('Title is required and must be a string'),
  validationMiddleware
];

export const deleteAmenitiesVal = [
  param('roomId').isMongoId().withMessage('Invalid room ID'),
  body('amenityId').isMongoId().withMessage('Invalid amenity ID'),
  validationMiddleware
];

export const deleteAttachmentVal = [
  param('roomId').isMongoId().withMessage('Invalid room ID'),
  body('attachId').isMongoId().withMessage('Invalid attachment ID'),
  validationMiddleware
];

export const updateAttachmentVal = [
  param('roomId').isMongoId().withMessage('Invalid room ID'),
  body('attachId').isMongoId().withMessage('Invalid attachment ID'),
  validationMiddleware
];

export const addAttachmentVal = [
  param('roomId').isMongoId().withMessage('Invalid room ID'),
  validationMiddleware
];

export const getRoomsVal = [
  query('location').optional().isString().withMessage('Location must be a string'),
  query('seatsAvailable').optional().isInt({ min: 0 }).withMessage('Seats available must be a non-negative integer'),
  query('seatsNum').optional().isInt({ min: 0 }).withMessage('Seats number must be a non-negative integer'),
  query('description').optional().isString().withMessage('Description must be a string'),
  query('title').optional().isString().withMessage('Title must be a string'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  validationMiddleware
];
