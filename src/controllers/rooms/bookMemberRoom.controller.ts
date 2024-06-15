import 'express-async-errors';

import { MemberBooking } from '../../models/memberBooking.model';
import { RoomBooking } from '../../models/roomBooking.model';
import { Room } from '../../models/rooms.model';
import { BookRoomForMemberHandler } from '../../types/endpoints/room.endpoint';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';



export const bookRoomForMemberHandler:BookRoomForMemberHandler = async (req,res,next)=>{
  const room = await Room.findById(req.body.room);
  if (!room) 
    return next(new NotFoundError('room not found'));
  if (room.type != 'shared') 
    return next(new BadRequestError('room not shared'));

  if (req.body.seatCount) {
    if ((room.seatsNum - room.seatsAvailable) < req.body.seatCount) 
      return next(new BadRequestError(`we do'nt have ${req.body.seatCount} seat available right now we have only ${room.seatsNum - room.seatsAvailable}`));
    room.seatsAvailable += req.body.seatCount;
  }

  const member = await MemberBooking.findOne({_id:req.body.member , user:req.body.user , end: { $lt: new Date() }});
  if (!member) 
    return next(new NotFoundError('user not have member'));

  if (req.body.endDate < member.end) 
    return next(new BadRequestError(`invalid end date because member end in ${member.end} , and your reservation end in ${req.body.endDate}`));

  const book = await RoomBooking.create({...req.body , reservationPaid:true});
  await room.save();
  res.status(201).json({message:'success' , data:book});
};