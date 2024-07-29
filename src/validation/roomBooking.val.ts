// import { body } from 'express-validator';

// import { validationMiddleware } from '../middlewares/global-validator.middleware';
// import { ReservationType } from '../models/roomBooking.model';

// export const create = [
//   body('start').isISO8601().bail().custom((val) => {
//     const date = new Date(val);
//     const now = new Date();
//     if (date > now) return true;
//     throw new Error('start date must be in the future');
//   }),
//   body('end').isISO8601().bail().custom((val, { req }) => {
//     const date = new Date(val);
//     const start = new Date(req.body.start);
//     if (date > start) return true;
//     throw new Error('end date must be Greater than start date');
//   }),
//   body('user').optional().isMongoId(),
//   body('room').isMongoId(),
//   body('reservationType').isIn(Object.values(ReservationType)).custom((val)=>{
//     if (val === ReservationType.shared) {
//       return [
//         body('plan').isMongoId(),
//         body('package').isMongoId(),
//         body('seatsCount').isInt({min:1})
//       ];
//     }

//     if (val === ReservationType.private) {
//       return [
//         body('plan').isMongoId()
//       ];
//     }

//     if (val === ReservationType.birthDay) {
//       return [
//         body('plan').isMongoId(),
//         body('seatsCount').isInt({min:1})
//       ];
//     }

//     throw new Error('invalid reservation plan');
//   }),
//   validationMiddleware
// ];

import { body, oneOf, ValidationChain } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';
import { ReservationType } from '../models/roomBooking.model';

// Common validation rules
const commonValidations: ValidationChain[] = [
  body('start').isISO8601().toDate(),
  body('end').isISO8601().toDate(),
  body('room').isMongoId(),
  body('user').optional().isMongoId(),
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
