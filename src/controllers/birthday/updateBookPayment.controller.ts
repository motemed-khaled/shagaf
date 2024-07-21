import 'express-async-errors';

import { DayBook } from '../../models/dayBook.model';
import { UpdateDayBookPaymentHandler } from '../../types/endpoints/birthday.endpoint';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const updateBookPaymentHandler: UpdateDayBookPaymentHandler = async (req, res, next) => {
  const book = await DayBook.findById(req.params.bookId);
  if (!book) return next(new NotFoundError('book not found'));

  book.paid = true;
  book.save();
  res.status(200).json({ message: 'success' });
};
