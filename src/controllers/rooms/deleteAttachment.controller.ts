import 'express-async-errors';

import { Room } from '../../models/rooms.model';
import { DeleteAttachmentHandler } from '../../types/endpoints/room.endpoint';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';



export const deleteAttachmentHandler:DeleteAttachmentHandler = async (req,res,next)=>{
  const room = await Room.findById(req.params.roomId);

  if (!room) 
    return next(new NotFoundError('room not found'));

  const attachmentIndex = room.attachments.findIndex((el:any) => el._id.toString() === req.body.attachId);

  if (attachmentIndex == -1) 
    return next(new NotFoundError('attachment not found'));
  Files.removeFiles(room.attachments[attachmentIndex].image);
  room.attachments.splice(attachmentIndex, 1);

  await room.save();
  res.status(200).json({message:'success'});
};