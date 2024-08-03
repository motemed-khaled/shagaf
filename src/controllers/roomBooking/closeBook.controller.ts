import { RequestHandler } from 'express';

import 'express-async-errors';
import { Package } from '../../models/package.model';
import { IRoomBooking, RoomBooking } from '../../models/roomBooking.model';
import { successResponse } from '../../types/response';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const closeBookHandler: RequestHandler<
  { bookId: string },
  successResponse<{ data: IRoomBooking }>,
  unknown,
  unknown
> = async (req, res, next) => {
  const book = await RoomBooking.findById(req.params.bookId);
  if (!book) return next(new NotFoundError('book not found'));

  if (book.closed) 
    return next(new BadRequestError('sorry book is closed'));

  const startDate: Date = new Date(book.start);
  const endDate: Date = new Date();

  const differenceInMilliseconds: number = endDate.getTime() - startDate.getTime();
  const differenceInHours: number = differenceInMilliseconds / (1000 * 60 * 60);

  const existPackage = await Package.findById(book.package);
  if (!existPackage) return next(new NotFoundError('package not found'));

  let reservationPrice = 0;  

  const difference = differenceInHours - existPackage.duration;
  const ifExtra = difference >= 0;
    
  if (!ifExtra) reservationPrice = existPackage.price;
  else {
    const extraTime = differenceInHours - existPackage.duration;
    reservationPrice = extraTime * existPackage.extraPrice + existPackage.price;
  }

  book.reservationPrice = reservationPrice;
  book.totalHours = differenceInHours;
  book.end = endDate;

  await book.save();

  res.status(200).json({message:'success' , data:book});
};
