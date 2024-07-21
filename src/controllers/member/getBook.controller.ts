import 'express-async-errors';

import { MemberBooking } from '../../models/memberBooking.model';
import { GetMemberBookHandler } from '../../types/endpoints/member.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const getBookHandler: GetMemberBookHandler = async (req, res, next) => {
  const book = await MemberBooking.findById(req.params.bookId).populate([
    { path: 'member' },
    { path: 'user', select: 'email username' },
  ]);
  if (!book) return next(new NotFoundError('book not found'));

  res.status(200).json({ message: 'success', data: book });
};
