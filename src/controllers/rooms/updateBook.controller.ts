import 'express-async-errors';

import { getDateDiff } from './bookRoom.controller';
import { Offer } from '../../models/offers.model';
import { Plan } from '../../models/plan.model';
import { RoomBooking } from '../../models/roomBooking.model';
import { Room } from '../../models/rooms.model';
import { UpdateRoomBookHandler } from '../../types/endpoints/room.endpoint';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';


export const updateRoomBookHandler:UpdateRoomBookHandler = async (req,res,next)=>{
  const book = await RoomBooking.findOne({_id:req.params.bookId ,reservationPaid:false});
  if (!book) 
    return next(new BadRequestError('cant update this book'));

  const room = await Room.findById(book.room);
  if (!room) 
    return next(new NotFoundError('room not found'));

  if (room.type === 'private') {
    const bookings = await RoomBooking.find({
      room: room._id,
      $or: [
        { startDate: { $lt: new Date(req.body.endDate) }, endDate: { $gt: new Date(req.body.startDate) } }
      ]
    });

    if (bookings.length > 0) 
      return next(new BadRequestError('The room is already booked for the selected time period'));
  }

  if (room.type === 'shared' && req.body.seatCount) {
    room.seatsAvailable -= book.seatCount;
    if ((room.seatsNum - room.seatsAvailable) < req.body.seatCount) 
      return next(new BadRequestError(`we do'nt have ${req.body.seatCount} seat available right now we have only ${room.seatsNum - room.seatsAvailable}`));
    room.seatsAvailable += req.body.seatCount;
  }
   
  const plan = await Plan.findById(book.plan);
  if (!plan) 
    return next(new NotFoundError('plan not found'));

  const timeStamp = getDateDiff(new Date(req.body.startDate) , new Date(req.body.endDate));

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

  let totalPrice = (timeStamp.hours * hourPrice) * req.body.seatCount?req.body.seatCount:book.seatCount;


  if (req.body.voucher) {
    const voucher = await Offer.findOne({_id:req.body.voucher , to:{$gte : new Date()}});
    if (!voucher) 
      return next(new NotFoundError('voucher not found or expired'));

    totalPrice = totalPrice * (1 - voucher.discount/100);
  }


  const updatedBook = await RoomBooking.findByIdAndUpdate(req.params.bookId , {startDate:req.body.startDate , endDate:req.body.endDate , totalPrice , seatCount:req.body.seatCount?req.body.seatCount:book.seatCount , voucher:req.body.voucher?req.body.voucher:null} , {new:true}).populate([
    {path:'user' , select:'email username'},
    {path:'room'},
    {path:'plan'}
  ]);
  await room.save();
  await updatedBook?.save();
  res.status(200).json({message:'success' , data:updatedBook!});
};