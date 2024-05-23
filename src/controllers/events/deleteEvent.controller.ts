import 'express-async-errors';

import { Event } from '../../models/event.model';
import { DeleteEventHandler } from '../../types/endpoints/event.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';


export const deleteEventHandler:DeleteEventHandler = async (req,res,next)=>{
  const deletedEvent = await Event.findByIdAndDelete(req.params.eventId);
  if (!deletedEvent) 
    return next(new NotFoundError('event not found'));

  Files.removeFiles(deletedEvent.cover);
  res.status(204).json({message:'success'});
};