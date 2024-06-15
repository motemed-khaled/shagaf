import 'express-async-errors';

import { RoomBooking } from '../../models/roomBooking.model';
import { GetBookHandler } from '../../types/endpoints/room.endpoint';
import { NotFoundError } from '../../utils/errors/notfound-error';



export const getBookHandler:GetBookHandler = async (req,res,next)=>{
  const book = await RoomBooking.findById(req.params.bookId).populate([
    {path:'user' , select:'email username'},
    {path:'room'},
    {path:'plan'},
    {path:'member'}
  ]);

  if (!book) 
    return next(new NotFoundError('book not found'));

  res.status(200).json({message:'success' , data:book});
};