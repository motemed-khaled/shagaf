import 'express-async-errors';

import { Plan } from '../../models/plan.model';
import { RoomBooking } from '../../models/roomBooking.model';
import { Room } from '../../models/rooms.model';
import { Users } from '../../models/user.model';
import { BookRoomHandler } from '../../types/endpoints/room.endpoint';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';


export const bookRoomHandler:BookRoomHandler = async (req,res,next)=>{
  if (req.body.user) {
    if (!await Users.findById(req.body.user)) 
      return next(new NotFoundError(`user ${req.body.user} not found`));
  }
  const room = await Room.findById(req.body.room);  
  if (!room) 
    return next(new NotFoundError('room notfound'));

  if (room.type === 'private') {
    const bookings = await RoomBooking.find({
      room: req.body.room,
      $or: [
        { startDate: { $lt: new Date(req.body.endDate) }, endDate: { $gt: new Date(req.body.startDate) } }
      ]
    });

    if (bookings.length > 0) 
      return next(new BadRequestError('The room is already booked for the selected time period'));
  }

  if (room.type === 'shared' && !req.body.seatCount) 
    return next(new BadRequestError('seat count required with shared room '));

  if (req.body.seatCount) {
    if ((room.seatsNum - room.seatsAvailable) < req.body.seatCount) 
      return next(new BadRequestError(`we do'nt have ${req.body.seatCount} seat available right now we have only ${room.seatsNum - room.seatsAvailable}`));
    room.seatsAvailable += req.body.seatCount;
  }

  const plan = await Plan.findById(req.body.plan);
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
  

  const totalPrice = (timeStamp.hours * hourPrice) * req.body.seatCount;
  const book = await RoomBooking.create({
    ...req.body ,
    user:req.body.user?req.body.user:req.loggedUser?.id ,
    totalPrice ,
    reservationPrice:totalPrice});
  
  await room.save();

  res.status(201).json({message:'success' , data:book});
};

interface DateDifference {
  hours: number;
  days: number;
  months: number;
}

export function getDateDiff(startDate: Date, endDate: Date): DateDifference {
  const diffInMilliseconds = Math.abs(endDate.getTime() - startDate.getTime());
  const diffInSeconds = diffInMilliseconds / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;
  const diffInMonths = Math.abs((endDate.getMonth() + (endDate.getFullYear() * 12)) - (startDate.getMonth() + (startDate.getFullYear() * 12)));

  return {
    hours: Math.round(diffInHours),
    days: Math.round(diffInDays),
    months: diffInMonths
  };
}