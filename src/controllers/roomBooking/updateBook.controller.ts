import { RequestHandler } from 'express';

import 'express-async-errors';
import { IRoomBooking, RoomBooking } from '../../models/roomBooking.model';
import { Room } from '../../models/rooms.model';
import { successResponse } from '../../types/response';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const updateBookHandler: RequestHandler<
  { bookId: string },
  successResponse<{ data: IRoomBooking }>,
  Pick<IRoomBooking, 'productPaid' | 'reservationPaid'>,
  unknown
> = async (req, res, next) => {
  const book = await RoomBooking.findById(req.params.bookId);

  if (!book) return next(new NotFoundError('book not found'));

  if (req.body.productPaid) 
    book.productPaid = true;

  if (req.body.reservationPaid) {
    book.reservationPaid = true;
    book.closed = true;
    await Room.findByIdAndUpdate(book.room, { $inc: { seatsAvailable: book.seatsCount } });
  }

  await book.save();

  res.status(200).json({message:'success' , data:book});
};
