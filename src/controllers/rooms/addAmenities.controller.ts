import 'express-async-errors';

import { Room } from '../../models/rooms.model';
import { AddAmenitiesHandler } from '../../types/endpoints/room.endpoint';
import { FOLDERS } from '../../types/folders';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';



export const addAmenitiesHandler:AddAmenitiesHandler = async (req,res,next)=>{
  const attachments = <Express.Multer.File[]>(req.files as any).attachments;

  const room = await Room.findById(req.params.roomId);
  if (!room) 
    return next(new NotFoundError('room not found'));
  let updatedRoom;
  if (attachments.length){
    const newField = {title:req.body.title , image:`/media/${FOLDERS.room}/${attachments[0].filename}`};    
    updatedRoom = await Room.findByIdAndUpdate(req.params.roomId , {$push:{amenities:newField}}, {new:true}).populate('plans');
  }
  
  if (!updatedRoom) 
    return next(new BadRequestError('failed to add amenities'));

  res.status(200).json({message:'success' , data:updatedRoom});
};