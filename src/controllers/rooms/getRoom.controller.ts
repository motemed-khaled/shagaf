import 'express-async-errors';

import { Room } from '../../models/rooms.model';
import { GetRoomHandler } from '../../types/endpoints/room.endpoint';
import { NotFoundError } from '../../utils/errors/notfound-error';



export const getRoomHandler:GetRoomHandler = async (req,res,next)=>{
  const room = await Room.findById(req.params.roomId)
    .populate('plans');
  if (!room) 
    return next(new NotFoundError('room not found'));

  res.status(200).json({message:'success' , data:room});
};