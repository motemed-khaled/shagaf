import 'express-async-errors';

import { Advertisement } from '../../models/advertisment.model';
import { GetAddHandler } from '../../types/endpoints/advertisment.endpoint';
import { NotFoundError } from '../../utils/errors/notfound-error';



export const getAddHandler:GetAddHandler = async (req,res,next)=>{
  const add = await Advertisement.findById(req.params.addId);
  if (!add) 
    return next(new NotFoundError('add not found'));

  res.status(200).json({message:'success' , data:add});
};