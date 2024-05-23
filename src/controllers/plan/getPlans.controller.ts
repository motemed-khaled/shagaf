import 'express-async-errors';
import { Plan } from '../../models/plan.model';
import { GetPlansHandler } from '../../types/endpoints/plan.endpoint';


export const getPlansHandler:GetPlansHandler = async(req,res,)=>{
  const plans= await Plan.find().limit(req.pagination.limit).skip(req.pagination.skip);
  const resultCount = await Plan.find().countDocuments();
  res.status(200).json({
    message:'success' ,
    pagination:{
      currentPage:req.pagination.page,
      resultCount,
      totalPages:Math.ceil(resultCount/req.pagination.limit)
    },
    data:plans
  });
};