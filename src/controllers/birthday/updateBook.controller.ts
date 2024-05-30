import 'express-async-errors';

import { DayBook } from '../../models/dayBook.model';
import { UpdateDayBookHandler } from '../../types/endpoints/birthday.endpoint';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';



export const updateBookHandler:UpdateDayBookHandler = async (req,res,next)=>{
  const book = await DayBook.findById(req.params.bookId);
  if (!book) 
    return next(new NotFoundError('book not found'));


  const updatedBook = await DayBook.findOneAndUpdate({_id:req.params.bookId , paid:false} , req.body , {new:true});

  if (!updatedBook) 
    return next(new BadRequestError('cant update this book'));

  res.status(200).json({message:'success' , data:updatedBook!});
};