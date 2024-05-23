import 'express-async-errors';

import { Event } from '../../models/event.model';
import { CreateEventHandler } from '../../types/endpoints/event.endpoints';
import { FOLDERS } from '../../types/folders';




export const createEventHandler:CreateEventHandler = async (req,res)=>{
  const cover = <Express.Multer.File[]>(req.files as any).cover;
  if (cover.length) 
    req.body.cover = `/media/${FOLDERS.event}/${cover[0].filename}`;

  const event = await Event.create(req.body);
  res.status(201).json({message:'success' , data:event});
};