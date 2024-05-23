import 'express-async-errors';

import { Room } from '../../models/rooms.model';
import { UpdateAmenitiesHandler } from '../../types/endpoints/room.endpoint';
import { FOLDERS } from '../../types/folders';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';



export const updateAmenitiesHandler:UpdateAmenitiesHandler = async (req,res,next)=>{
  const attachments = <Express.Multer.File[]>(req.files as any).attachments;
  
  const room = await Room.findById(req.params.roomId);
  if (!room) 
    return next(new NotFoundError('room not found'));
  
  const index = room.amenities.findIndex((el:any)=>el._id.toString() === req.body.amenityId);
  if (index === -1) 
    return next(new NotFoundError('amenities not found'));

  if (attachments.length) {
    Files.removeFiles(room.amenities[index].image);
    room.amenities[index].image = `/media/${FOLDERS.room}/${attachments[0].filename}`;
  }

  if (req.body.title) 
    room.amenities[index].title = req.body.title;
  
  const updatedPlan = await (await room.save()).populate('plans');

  res.status(200).json({message:'success' , data:updatedPlan});
  
};