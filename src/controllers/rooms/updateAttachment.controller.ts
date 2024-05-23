import 'express-async-errors';

import { Room } from '../../models/rooms.model';
import { UpdateAttachmentsHandler } from '../../types/endpoints/room.endpoint';
import { FOLDERS } from '../../types/folders';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';



export const updateAttachmentHandler:UpdateAttachmentsHandler = async (req,res,next)=>{
  const attachments = <Express.Multer.File[]>(req.files as any).attachments;
  const room = await Room.findById(req.params.roomId);
  if (!room) 
    return next(new NotFoundError('room not found'));

  if (attachments.length) {
    const attachmentIndex = room.attachments.findIndex((el:any) => el._id.toString() === req.body.attachId);

    if (attachmentIndex == -1) 
      return next(new NotFoundError('attachment not found'));
    Files.removeFiles(room.attachments[attachmentIndex].image);
    
    room.attachments[attachmentIndex].image = `/media/${FOLDERS.room}/${attachments[0].filename}`;
  }

  const updateRoom = await (await room.save()).populate('plans');
  res.status(200).json({message:'success' , data:updateRoom});
    
};