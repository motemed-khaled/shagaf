import 'express-async-errors';

import { Member } from '../../models/members.model';
import { DeleteMemberHandler } from '../../types/endpoints/member.endpoints';



export const deleteMemberHandler : DeleteMemberHandler = async (req,res)=>{
  await Member.findByIdAndDelete(req.params.memberId);
  res.status(204).json({message:'success'});
};