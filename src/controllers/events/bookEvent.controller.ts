import 'express-async-errors';

import { Event } from '../../models/event.model';
import { EventBook } from '../../models/eventBook.model';
import { BookEventHandler } from '../../types/endpoints/event.endpoints';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';


export const bookEventHandler:BookEventHandler = async (req,res,next)=>{
  const event = await Event.findById(req.body.event);

  if (!event) 
    return next(new NotFoundError('event not found'));

  if (new Date() > new Date(event.date))
    return next(new BadRequestError(`sorry event finish in ${event.date}`));

  const book = await EventBook.create({
    user:req.loggedUser?.id,
    event:req.body.event,
    date:event.date,
    totalPrice:event.cost
  });

  res.status(201).json({message:'success' , data:book});
};