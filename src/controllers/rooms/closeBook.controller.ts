import 'express-async-errors';

import { Plan } from '../../models/plan.model';
import { RoomBooking } from '../../models/roomBooking.model';
import { CloseBookHandler } from '../../types/endpoints/room.endpoint';
import { NotFoundError } from '../../utils/errors/notfound-error';


export const closeBookHandler:CloseBookHandler = async (req,res,next)=>{

  const book = await RoomBooking.findById(req.params.bookId);
  if (!book) 
    return next(new NotFoundError('book not found'));

  const plan = await Plan.findById(book.plan);
  if (!plan) 
    return next(new NotFoundError('plan not found'));
  const endDate = Date.now();
  const bookHour = ((new Date(book.startDate).getTime() - new Date(endDate).getTime()) / (1000 * 60 * 60));
    
  const reservationPrice = bookHour * plan.price;
  const totalPrice = reservationPrice + book.coffeePrice;

  const updatedBooking = await RoomBooking.findByIdAndUpdate(req.params.bookId , {endDate , reservationPrice , totalPrice} , {new:true}).populate([
    {path:'user' , select:'email username'},
    {path:'room'},
    {path:'plan'},
    {path:'coffee.product'}
  ]);

  res.status(200).json({message:'success' , data:updatedBooking!});
};