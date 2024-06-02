import 'express-async-errors';

import { EventBook } from '../../models/eventBook.model';
import { Offer } from '../../models/offers.model';
import { UpdateEventBookHandler } from '../../types/endpoints/event.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';



export const updateEventBookHandler:UpdateEventBookHandler = async (req,res,next)=>{
  const book = await EventBook.findById(req.params.bookId).populate([
    {path:'user' , select:'email username'},
    {path:'event'}
  ]);
  if (!book) 
    return next(new NotFoundError('book not found'));

  const voucher = await Offer.findOne({_id:req.body.voucher , to:{$gte : new Date()}});
  if (!voucher) 
    return next(new NotFoundError('voucher not found or expired'));

  book.totalPrice = book.totalPrice * (1 - voucher.discount/100);

  await book.save();

  res.status(200).json({message:'success' , data:book});
};