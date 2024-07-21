import 'express-async-errors';

import { Setting } from '../../models/settings.models';
import { UpdateSettingHandler } from '../../types/endpoints/setting.endpoint';
import { NotFoundError } from '../../utils/errors/notfound-error';



export const updateSettingHandler:UpdateSettingHandler = async (req,res,next)=>{
  const setting = await Setting.findByIdAndUpdate(req.params.settingId , req.body , {new:true});

  if (!setting) 
    return next(new NotFoundError('setting not found'));

  res.status(200).json({message:'success' , data:setting});
};