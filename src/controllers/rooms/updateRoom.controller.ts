import 'express-async-errors';

import { Plan } from '../../models/plan.model';
import { Room } from '../../models/rooms.model';
import { UpdateRoomHandler } from '../../types/endpoints/room.endpoint';
import { FOLDERS } from '../../types/folders';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';



export const updateRoomHandler:UpdateRoomHandler = async (req,res,next)=>{

  const room = await Room.findById(req.params.roomId);
  if (!room) 
    return next(new NotFoundError('plan not found'));

  const cover = <Express.Multer.File[]>(req.files as any).cover;

  if (req.body.plans) {
    const plansCount = await Plan.countDocuments({_id:req.body.plans.map(el=>el)});
    if (plansCount != req.body.plans.length) 
      return next(new BadRequestError('invalid plans'));
  }

  if (cover?.length){
    req.body.cover = `/media/${FOLDERS.room}/${cover[0].filename}`;
    Files.removeFiles(room.cover);
  }

  const updatedRoom = await Room.findByIdAndUpdate(req.params.roomId , req.body , {new:true})
    .populate({path:'plans'}).lean();

  if (!updatedRoom) 
    return next(new BadRequestError('failed to update room'));


  res.status(200).json({message:'success' , data:updatedRoom});
};