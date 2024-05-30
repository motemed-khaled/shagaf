import 'express-async-errors';

import { Event } from '../../models/event.model';
import { EventBook } from '../../models/eventBook.model';
import { Users } from '../../models/user.model';
import { BookEventHandler } from '../../types/endpoints/event.endpoints';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';


export const bookEventHandler:BookEventHandler = async (req,res,next)=>{

  let user;
  if (req.body.user) {    
    user = await Users.findById(req.body.user);    
    if (!user) 
      return next(new NotFoundError(`user ${req.body.user} not found`));
  }

  const event = await Event.findById(req.body.event);
  if (!event) 
    return next(new NotFoundError('event not found'));

  if (new Date() > new Date(event.date))
    return next(new BadRequestError(`sorry event finish in ${event.date}`));

  let totalPrice = event.cost;

  if (req.body.stuffDiscount)
    totalPrice = totalPrice - req.body.stuffDiscount;

  if (req.body.pointDiscount){
    if (user) {
      totalPrice = totalPrice - (user.point / 1000) * 10;
      req.body.pointDiscount = (user!.point / 1000)*10;
    }
    else {
      user = await Users.findById(req.loggedUser?.id);
      totalPrice = totalPrice - (user!.point / 1000) * 10;
      req.body.pointDiscount = (user!.point / 1000)*10;
    }
    
  }
    

  const book = await EventBook.create({
    user:user?user._id:req.loggedUser?.id,
    event:req.body.event,
    date:event.date,
    totalPrice
  });

  res.status(201).json({message:'success' , data:book});
};