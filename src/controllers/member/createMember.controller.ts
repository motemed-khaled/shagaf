import 'express-async-errors';

import { Member } from '../../models/members.model';
import { CreateMemberHandler } from '../../types/endpoints/member.endpoints';




export const createMemberHandler:CreateMemberHandler = async (req,res)=>{
  const member = await Member.create(req.body);
  res.status(201).json({message:'success' , data:member});
};