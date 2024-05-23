import 'express-async-errors';

import { Plan } from '../../models/plan.model';
import { Room } from '../../models/rooms.model';
import { CreateRoomHandler } from '../../types/endpoints/room.endpoint';
import { FOLDERS } from '../../types/folders';
import { BadRequestError } from '../../utils/errors/bad-request-error';



export const createRoomHandler:CreateRoomHandler = async (req,res,next)=>{
  const attachments = <Express.Multer.File[]>(req.files as any).attachments;
  const cover = <Express.Multer.File[]>(req.files as any).cover;

  const plansCount = await Plan.countDocuments({_id:req.body.plans?.map(el=>el)});
  if (plansCount != req.body.plans?.length)
    return next(new BadRequestError('invalid plans'));

  if (attachments.length) {
    req.body.attachments = attachments.map(el =>{
      return {
        image:`/media/${FOLDERS.room}/${el.filename}`
      };
    });
  }

  if (cover.length) 
    req.body.cover = `/media/${FOLDERS.room}/${cover[0].filename}`;



  const room = await Room.create(req.body);
  res.status(201).json({message:'success' , data:room});
};