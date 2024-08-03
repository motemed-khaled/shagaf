import { body, oneOf, param, query, ValidationChain } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';
import { BookType, ReservationPaidType, ReservationType } from '../models/roomBooking.model';

// Common validation rules
const commonValidations: ValidationChain[] = [
  body('start').isISO8601().toDate().custom((val) => {
    const date = new Date(val);
    const now = new Date();
    if (date > now) return true;
    throw new Error('start date must be in the future');
  }),
  body('end').isISO8601().toDate().custom((val, { req }) => {
    const date = new Date(val);
    const start = new Date(req.body.start);
    if (date > start) return true;
    throw new Error('end date must be Greater than start date');
  }),
  body('room').isMongoId(),
  body('user').optional().isMongoId(),
  body('pointDiscount').optional().isBoolean().withMessage('stuffDiscount must by boolean'),
  body('stuffDiscount').optional().isInt({ min: 1 }).withMessage('pointDiscount must by integer'),
];

const sharedValidations: ValidationChain[] = [
  body('plan').optional().isMongoId(),
  body('package').optional().isMongoId(),
  body('seatsCount').isInt({ min: 1 }),

];

const privateValidations: ValidationChain[] = [body('plan').isMongoId()];

const birthDayValidations: ValidationChain[] = [
  body('plan').isMongoId(),
  body('seatsCount').isInt({ min: 1 }),
];

export const validateRoomBooking = [
  ...commonValidations,
  body('reservationType').isIn(Object.values(ReservationType)),
  oneOf(
    [
      [body('reservationType').equals(ReservationType.shared), ...sharedValidations],
      [body('reservationType').equals(ReservationType.private), ...privateValidations],
      [body('reservationType').equals(ReservationType.birthDay), ...birthDayValidations],
    ],
    { message: 'Invalid reservation type or missing required fields for the specified type' },
  ),
  validationMiddleware,
];

export const getOne = [param('bookId').isMongoId(), validationMiddleware];

export const addProductVal = [
  param('bookId').isMongoId(),
  body('products').isArray({ min: 1 }),
  body('products.*.product').isMongoId(),
  body('products.*.count').isInt({ min: 1 }),
  validationMiddleware,
];

export const deleteProductVal = [
  param('bookId').isMongoId(),
  body('itemId').isMongoId(),
  validationMiddleware,
];

export const getAll = [
  query('limit').optional().isInt({ min: 1 }),
  query('page').optional().isInt({ min: 1 }),
  query('userId').optional().isMongoId().withMessage('Invalid user ID format'),
  query('roomId').optional().isMongoId().withMessage('Invalid room ID format'),
  query('planId').optional().isMongoId().withMessage('Invalid plan ID format'),
  query('packageId').optional().isMongoId().withMessage('Invalid package ID format'),

  query('startDate').optional().isISO8601().withMessage('Invalid start date format'),
  query('endDate').optional().isISO8601().withMessage('Invalid end date format'),

  query('reservationType')
    .optional()
    .isIn(Object.values(ReservationType))
    .withMessage('Invalid reservation type'),
  query('reservationPaidType')
    .optional()
    .isIn(Object.values(ReservationPaidType))
    .withMessage('Invalid reservation paid type'),

  query('productPaid').optional().isBoolean().withMessage('Product paid should be a boolean'),
  query('extraPaid').optional().isBoolean().withMessage('Extra paid should be a boolean'),

  query('closed').optional().isBoolean().withMessage('Closed should be a boolean'),

  query('seatsCountFrom')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Seats count from should be a non-negative integer'),
  query('seatsCountTo')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Seats count to should be a non-negative integer'),

  query('reservationPriceFrom')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Reservation price from should be a non-negative number'),
  query('reservationPriceTo')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Reservation price to should be a non-negative number'),

  query('productPriceFrom')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Product price from should be a non-negative number'),
  query('productPriceTo')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Product price to should be a non-negative number'),

  query('extraPriceFrom')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Extra price from should be a non-negative number'),
  query('extraPriceTo')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Extra price to should be a non-negative number'),

  query('type').optional().isIn(Object.values(BookType)),
  validationMiddleware,
];

export const openBookVal = [
  body('user').isMongoId(),
  body('package').isMongoId(),
  body('room').isMongoId(),
  body('seatsCount').isInt({min:1}),
  validationMiddleware
];  

export const updateBookVal = [
  param('bookId').isMongoId(),
  body('reservationPaid').optional().isBoolean().toBoolean(),
  body('productPaid').optional().isBoolean().toBoolean(),
  validationMiddleware
];

export const closeBookVal = [
  param('bookId').isMongoId(),
  validationMiddleware
];