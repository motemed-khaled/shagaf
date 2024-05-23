import 'express-async-errors';

import { Member } from '../../models/members.model';
import { UpdateMemberHandler } from '../../types/endpoints/member.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';


export const updateMemberHandler:UpdateMemberHandler = async (req,res,next)=>{
  const member = await Member.findByIdAndUpdate(req.params.memberId , req.body , {new:true});
  if (!member) 
    return next(new NotFoundError('member not found'));

  res.status(200).json({message:'success' , data:member});
};

