import 'express-async-errors';

import { Member } from '../../models/members.model';
import { GetMembersHandler } from '../../types/endpoints/member.endpoints';




export const getMembersHandler:GetMembersHandler = async (req,res)=>{
  const members = await Member.find().skip(req.pagination.skip).limit(req.pagination.limit);

  const resultCount = await Member.find().countDocuments();

  res.status(200).json({
    message:'success',
    pagination:{
      currentPage:req.pagination.page,
      resultCount,
      totalPages:Math.ceil(resultCount/req.pagination.limit)
    },
    data:members
  });
};