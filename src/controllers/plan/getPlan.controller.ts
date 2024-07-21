import 'express-async-errors';

import { Plan } from '../../models/plan.model';
import { GetPlanHandler } from '../../types/endpoints/plan.endpoint';
import { NotFoundError } from '../../utils/errors/notfound-error';


export const getPlanHandler:GetPlanHandler = async (req,res,next)=>{
  const plan = await Plan.findById(req.params.planId);

  if (!plan) 
    return next(new NotFoundError('plan not found'));

  res.status(200).json({message:'success' , data:plan});
};