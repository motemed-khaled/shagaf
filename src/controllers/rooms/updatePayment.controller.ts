import 'express-async-errors';

import { RoomBooking } from '../../models/roomBooking.model';
import { UpdatePaymentHandler } from '../../types/endpoints/room.endpoint';
import { NotFoundError } from '../../utils/errors/notfound-error';


export const updatePaymentHandler:UpdatePaymentHandler = async (req,res,next)=>{
  const book = await RoomBooking.findById(req.params.bookId);

  if (!book) 
    return next(new NotFoundError('book not found'));

  book.coffeePaid = req.body.coffeePaid ? req.body.coffeePaid:book.coffeePaid;
  book.reservationPaid = req.body.reservationPaid?req.body.reservationPaid:book.reservationPaid;
  book.extraPaid = req.body.extraPaid?req.body.extraPaid:book.extraPaid;

  await book.save();
  res.status(200).json(<any>{message:'success' , book});
};