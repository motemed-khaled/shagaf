import { RequestHandler } from 'express';

import { PaymentType } from '../../models/payment.model';
import { successResponse } from '../response';






export interface CreatePaymentHandler
extends RequestHandler<unknown , successResponse , {bookId:string , type:PaymentType} , unknown>{}