import 'express-async-errors';

import { Users } from '../../models/user.model';
import { GetUserHandler } from '../../types/endpoints/user.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';



export const getUserHandler:GetUserHandler = async (req,res,next)=>{
  const user = await Users.findById(req.params.userId);
  if (!user) 
    return next(new NotFoundError('user not found'));

  res.status(200).json({message:'success' , data:user});
};