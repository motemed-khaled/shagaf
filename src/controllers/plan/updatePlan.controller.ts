import 'express-async-errors';

import { Plan } from '../../models/plan.model';
import { UpdatePlanHandler } from '../../types/endpoints/plan.endpoint';
import { FOLDERS } from '../../types/folders';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';


export const updatePlanHandler:UpdatePlanHandler = async (req,res,next)=>{

  const icon = req.files as Express.Multer.File[];
  
  if (icon.length){
    const plan = await Plan.findById(req.params.planId);
    if (!plan) 
      return next(new NotFoundError(`plan not found ${req.params.planId}`));
    req.body.icon = `/media/${FOLDERS.plan}/${icon[0].filename}`;
    Files.removeFiles(plan.icon);
  }

  const updatedPlan = await Plan.findByIdAndUpdate(req.params.planId , req.body , {new:true});
  if (!updatedPlan) 
    return next(new NotFoundError('plan not found'));

  res.status(200).json({message:'success' , data:updatedPlan});
};