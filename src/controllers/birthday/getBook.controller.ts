import 'express-async-errors';

import { DayBook } from '../../models/dayBook.model';
import { GetDayBookHandler } from '../../types/endpoints/birthday.endpoint';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const getBookHandler: GetDayBookHandler = async (req, res, next) => {
  const book = await DayBook.findById(req.params.bookId).populate([
    { path: 'user', select: 'username email' },
    { path: 'products.product' },
  ]);

  if (!book) return next(new NotFoundError('book not found'));

  res.status(200).json({ message: 'success', data: book });
};
