import 'express-async-errors';

import { Plan } from '../../models/plan.model';
import { DeletePlanHandler } from '../../types/endpoints/plan.endpoint';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';


export const deletePlanHandler:DeletePlanHandler = async (req , res , next )=>{
  const deletedPlan = await Plan.findByIdAndDelete(req.params.planId);
  if (!deletedPlan) 
    return next(new NotFoundError('plan not found'));
  Files.removeFiles(deletedPlan.icon?deletedPlan.icon:undefined);
  res.status(204).json({message:'success'});
};