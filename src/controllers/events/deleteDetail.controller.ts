import 'express-async-errors';

import { Event } from '../../models/event.model';
import { DeleteDetailHandler } from '../../types/endpoints/event.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';



export const deleteDetailHandler:DeleteDetailHandler = async (req,res,next)=>{
  const event = await Event.findById(req.params.eventId);

  if (!event) 
    return next(new NotFoundError('event not found'));

  const index = event.details.findIndex((el:any)=>el._id.toString() === req.body.titleId);
  if (index === -1) 
    return next(new NotFoundError('detail not found'));

  event.details.splice(index , 1);
  await event.save();
  res.status(200).json({message:'success'});
};