import 'express-async-errors';

import { Plan } from '../../models/plan.model';
import { RoomBooking } from '../../models/roomBooking.model';
import { Room } from '../../models/rooms.model';
import { Users } from '../../models/user.model';
import { OpenNewBookHandler } from '../../types/endpoints/room.endpoint';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';



export const openNewBookHandler:OpenNewBookHandler = async (req,res,next)=>{

  const user = await Users.findById(req.body.user);
  if (!user) 
    return next(new NotFoundError(`user ${req.body.user} not found`));
  
  const room = await Room.findById(req.body.room);

  if (!room) 
    return next(new NotFoundError('room notfound'));

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

  if (plan.stamp != 'Hour') 
    return next(new BadRequestError('plan stamp must be hour'));

  const book = await RoomBooking.create(req.body);
  await room.save();
  res.status(200).json({message:'success' , data:book});
};