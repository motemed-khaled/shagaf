import 'express-async-errors';

import { EventBook } from '../../models/eventBook.model';
import { GetEventBookHandler } from '../../types/endpoints/event.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const getEventBookHandler: GetEventBookHandler = async (req, res, next) => {
  const book = await EventBook.findById(req.params.bookId).populate([
    { path: 'user', select: 'email username' },
    { path: 'event' },
  ]);

  if (!book) return next(new NotFoundError('book not found'));

  res.status(200).json({ message: 'success', data: book });
};
