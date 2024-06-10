import express from 'express';


import * as handler from '../controllers/payment';
import { isauthenticated } from '../guards/auth.guard';
import * as val from '../validation/payment.val';



export const router = express.Router();

router.route('/').post(isauthenticated , val.createPaymentVal , handler.createPaymentHandler);