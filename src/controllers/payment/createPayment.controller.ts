import 'express-async-errors';

import { DayBook } from '../../models/dayBook.model';
import { EventBook } from '../../models/eventBook.model';
import { MemberBooking } from '../../models/memberBooking.model';
import { Payment, PaymentType } from '../../models/payment.model';
import { RoomBooking } from '../../models/roomBooking.model';
import { CreatePaymentHandler } from '../../types/endpoints/payment.endpoint';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { KashierPayment } from '../../utils/kashier';
import { logger } from '../../utils/winston.logger';

export const createPaymentHandler: CreatePaymentHandler = async (req, res, next) => {
  let book;
  if (req.body.type == PaymentType.dayBook) book = await DayBook.findById(req.body.bookId);
  if (req.body.type == PaymentType.eventBook) book = await EventBook.findById(req.body.bookId);
  if (req.body.type == PaymentType.memberBook) book = await MemberBooking.findById(req.body.bookId);
  if (req.body.type == PaymentType.roomBooking) book = await RoomBooking.findById(req.body.bookId);

  if (!book) return next(new NotFoundError('book not found'));

  try {
    const paymentResponse = await KashierPayment.createPayment(
      book.totalPrice,
      'EGP',
      book._id,
      book.user.toString(),
    );

    if (paymentResponse.status === 'success') {
      const payment = new Payment({
        orderId: book._id,
        amount: book.totalPrice,
        currency: 'EGP',
        status: 'pending',
        paymentUrl: paymentResponse.data.payment_url,
      });
      await payment.save();

      res.json(<any>{ message: 'success', payment_url: paymentResponse.data.payment_url });
    } else {
      return next(new BadRequestError(`${paymentResponse.message}`));
    }
  } catch (error) {
    logger.error('Error creating payment:', error);
    next(error);
  }
};
