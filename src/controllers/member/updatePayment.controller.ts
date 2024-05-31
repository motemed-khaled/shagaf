import 'express-async-errors';

import { MemberBooking } from '../../models/memberBooking.model';
import { UpdateBookPaymentHandler } from '../../types/endpoints/member.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';



export const updateBookPaymentHandler:UpdateBookPaymentHandler = async (req,res,next)=>{
  const book = await MemberBooking.findById(req.params.bookId);
  if (!book) 
    return next(new NotFoundError('book not found'));

  book.paid = true;
  await book.save();

  res.status(200).json({message:'success' , data:book});
};