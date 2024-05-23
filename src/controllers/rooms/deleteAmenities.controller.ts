import 'express-async-errors';

import { Room } from '../../models/rooms.model';
import { DeleteAmenitiesHandler } from '../../types/endpoints/room.endpoint';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';



export const deleteAmenitiesHandler:DeleteAmenitiesHandler = async (req,res,next)=>{
  const room = await Room.findById(req.params.roomId);

  if (!room) 
    return next(new NotFoundError('room not found'));
  const index = room.amenities.findIndex((el:any)=> el._id.toString() === req.body.amenityId);
  if (index === -1) 
    return next(new NotFoundError('amenities not found'));

  Files.removeFiles(room.amenities[index].image);
  room.amenities.splice(index , 1);

  await room.save();
  res.status(200).json({message:'success'});
    
};