import 'express-async-errors';

import { getDateDiff } from './bookRoom.controller';
import { Plan } from '../../models/plan.model';
import { RoomBooking } from '../../models/roomBooking.model';
import { Room } from '../../models/rooms.model';
import { AddExtraTimeHandler } from '../../types/endpoints/room.endpoint';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';



export const addExtraTimeHandler:AddExtraTimeHandler = async (req,res,next)=>{
  const book = await RoomBooking.findOne({_id:req.params.bookId , extraPaid:false});
  if (!book) 
    return next(new NotFoundError('book not found'));
  if (!book.reservationPaid) 
    return next(new BadRequestError('can not add extra time before paid reservation time'));

  const room = await Room.findById(book.room);
  if (!room) 
    return next(new NotFoundError('room not found'));

  if (room.type === 'private') {
    const bookings = await RoomBooking.find({
      room: book.room,
      $or: [
        { startDate: { $lt: new Date(req.body.extraTimeTo) }, endDate: { $gt: new Date(req.body.extraTimeFrom) } }
      ]
    });

    if (bookings.length > 0) 
      return next(new BadRequestError('The room is already booked for the selected time period'));
  }

  const plan = await Plan.findById(book.plan);
  if (!plan) 
    return next(new NotFoundError('plan not found'));
  const timeStamp = getDateDiff(new Date(req.body.extraTimeFrom) , new Date(req.body.extraTimeTo));

  let hourPrice:number = 0;
  if (timeStamp.months > 0 ) {
    if (plan.stamp != 'Month') 
      return next(new BadRequestError(`your reservation plan cant be by ${plan.stamp} your reservation time is month ${timeStamp.months} day ${timeStamp.days} hour ${timeStamp.hours}`));
    hourPrice = plan.price / (30*24);
  }
  else if (timeStamp.days > 0 ) {
    if (plan.stamp != 'Day') 
      return next(new BadRequestError(`your reservation plan cant be by ${plan.stamp} your reservation time is month ${timeStamp.months} day ${timeStamp.days} hour ${timeStamp.hours}`));
    hourPrice = plan.price / 24;
  }
  else if (timeStamp.hours > 0 ) {
    if (plan.stamp != 'Hour') 
      return next(new BadRequestError(`your reservation plan cant be by ${plan.stamp} your reservation time is month ${timeStamp.months} day ${timeStamp.days} hour ${timeStamp.hours}`));
    hourPrice = plan.price;
  }

  book.extraPrice = (timeStamp.hours * hourPrice)*book.seatCount;
  book.extraTimeFrom = req.body.extraTimeFrom;
  book.extraTimeTo = req.body.extraTimeTo;
  book.totalPrice = book.totalPrice + book.extraPrice;

  const newBook = await (await book.save()).populate([
    {path:'user' , select:'email username'},
    {path:'room'},
    {path:'plan'},
    {path:'coffee.product'}
  ]);
  
  res.status(200).json({message:'success' , data:newBook});
};