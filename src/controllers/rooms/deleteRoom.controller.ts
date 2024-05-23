import 'express-async-errors';

import { Room } from '../../models/rooms.model';
import { DeleteRoomHandler } from '../../types/endpoints/room.endpoint';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';



export const deleteRoomHandler:DeleteRoomHandler = async (req,res,next)=>{
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.roomId);

    if (!deletedRoom) 
      return next(new NotFoundError('room not found'));
    if (deletedRoom.cover) 
      Files.removeFiles(deletedRoom.cover);
  
    if (deletedRoom.attachments.length) 
      Files.removeFiles(...deletedRoom.attachments.map(el=>el.image));
  
    if (deletedRoom.amenities.length) {
      Files.removeFiles(...deletedRoom.amenities.map(el=>el.image));
    }
    res.status(204).json({message:'success'});
  } catch (error) {
    return next(new BadRequestError('failed to remove room '));
  }
    
};