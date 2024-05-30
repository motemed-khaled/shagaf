import 'express-async-errors';

import { EventBook } from '../../models/eventBook.model';
import { UpdateEventBookPaymentHandler } from '../../types/endpoints/event.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';



export const updateEventBookPaymentHandler:UpdateEventBookPaymentHandler = async (req,res,next)=>{
  const book = await EventBook.findById(req.params.bookId);
  if (!book)
    return next(new NotFoundError('book not found'));

  book.paid = true;
  await book.save();
  res.status(200).json({message:'success'});
};