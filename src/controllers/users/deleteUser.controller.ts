import 'express-async-errors';

import { Users } from '../../models/user.model';
import { DeleteUserHandler } from '../../types/endpoints/user.endpoints';


export const deleteUserHandler:DeleteUserHandler =  async (req,res)=>{
  await Users.findByIdAndDelete(req.params.userId);
  res.status(204).json({message:'success'});
};