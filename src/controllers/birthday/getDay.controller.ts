import 'express-async-errors';

import { BirthDay } from '../../models/birthDay.model';
import { GetDayHandler } from '../../types/endpoints/birthday.endpoint';
import { NotFoundError } from '../../utils/errors/notfound-error';



export const getDayHandler:GetDayHandler = async (req,res,next)=>{
  const day = await BirthDay.findById(req.params.dayId);
  if (!day) 
    return next(new NotFoundError('day not found'));

  res.status(200).json({message:'success' , data:day});
};