import 'express-async-errors';

import { Room } from '../../models/rooms.model';
import { AddAttachmentHandler } from '../../types/endpoints/room.endpoint';
import { FOLDERS } from '../../types/folders';
import { NotFoundError } from '../../utils/errors/notfound-error';


export const addAattachmentHandler:AddAttachmentHandler = async (req,res,next)=>{

  let room = await Room.findById(req.params.roomId);

  if (!room) 
    return next(new NotFoundError('room not found'));
  const attachments = <Express.Multer.File[]>(req.files as any).attachments;

  if (attachments.length) {
    if (attachments.length) {
      req.body.attachments = attachments.map(el =>{
        return {
          image:`/media/${FOLDERS.room}/${el.filename}`
        };
      });      
    }
    room = await Room.findByIdAndUpdate(
      req.params.roomId,
      {
        $push: {
          attachments: {
            $each: (Array.isArray(req.body.attachments) ? req.body.attachments.map(el => el) : [])
          }
        }
      },
      { new: true }
    ).populate('plans');
    
  }
  res.status(200).json({message:'success' , data:room!});
    
};