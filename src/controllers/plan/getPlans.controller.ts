import 'express-async-errors';

import { Plan } from '../../models/plan.model';
import { GetPlansHandler } from '../../types/endpoints/plan.endpoint';


export const getPlansHandler:GetPlansHandler = async (req,res)=>{

  if (req.query.type) 
    req.pagination.filter.type = req.query.type;

  const plans = await Plan.find(req.pagination.filter).skip(req.pagination.skip).limit(req.pagination.limit);

  const resultCount = await Plan.countDocuments(req.pagination.filter);

  res.status(200).json({
    message:'success',
    pagination:{
      currentPage:req.pagination.page,
      resultCount,
      totalPages:Math.ceil(resultCount/req.pagination.limit)
    },
    data:plans
  });
};