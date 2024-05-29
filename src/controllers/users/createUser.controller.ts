import 'express-async-errors';

import { Users } from '../../models/user.model';
import { CreateUserHandler } from '../../types/endpoints/user.endpoints';


export const createUserHandler:CreateUserHandler = async (req,res)=>{
  const user = await Users.create(req.body);
  res.status(201).json({message:'success' , data:user});
};