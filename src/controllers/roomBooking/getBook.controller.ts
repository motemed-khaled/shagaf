import { RequestHandler } from 'express';

import 'express-async-errors';
import { IRoomBooking, RoomBooking } from '../../models/roomBooking.model';
import { successResponse } from '../../types/response';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const getBookHandler: RequestHandler<
  { bookId: string },
  successResponse<{ data: IRoomBooking }>,
  unknown,
  unknown
> = async (req, res, next) => {
  const book = await RoomBooking.findById(req.params.bookId)
    .populate([{path:'package'} , {path:'plan'} , {path:'room'} , {path:'user'} , {path:'products.product'}]);


  if (!book) return next(new NotFoundError('book not found'));

  res.status(200).json({ message: 'success', data: book });
};
