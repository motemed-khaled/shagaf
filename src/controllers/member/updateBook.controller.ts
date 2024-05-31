import 'express-async-errors';

import { MemberBooking } from '../../models/memberBooking.model';
import { UpdateBookHandler } from '../../types/endpoints/member.endpoints';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';



export const updateBookHandler:UpdateBookHandler = async (req,res,next)=>{
  const book = await MemberBooking.findById(req.params.bookId);

  if (!book) 
    return next(new NotFoundError('book not found'));

  if (book.paid) 
    return next(new BadRequestError('can not update book after payment'));

  book.start = req.body.start;
  await book.save();
  res.status(200).json({message:'success' , data:book});
};