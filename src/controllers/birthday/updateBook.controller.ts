import 'express-async-errors';

import { DayBook } from '../../models/dayBook.model';
import { Offer } from '../../models/offers.model';
import { UpdateDayBookHandler } from '../../types/endpoints/birthday.endpoint';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const updateBookHandler: UpdateDayBookHandler = async (req, res, next) => {
  const book = await DayBook.findById(req.params.bookId);
  if (!book) return next(new NotFoundError('book not found'));

  if (req.body.voucher) {
    const voucher = await Offer.findOne({ _id: req.body.voucher, to: { $gte: new Date() } });
    if (!voucher) return next(new NotFoundError('voucher not found or expired'));

    req.body.totalPrice = book.totalPrice * (1 - voucher.discount / 100);
  }

  const updatedBook = await DayBook.findOneAndUpdate(
    { _id: req.params.bookId, paid: false },
    req.body,
    { new: true },
  );

  if (!updatedBook) return next(new BadRequestError('cant update this book'));

  res.status(200).json({ message: 'success', data: updatedBook! });
};
