import { body } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';
import { PaymentType } from '../models/payment.model';



export const createPaymentVal =[
  body('bookId').isMongoId(),
  body('type').isIn(Object.values(PaymentType)),
  validationMiddleware
];