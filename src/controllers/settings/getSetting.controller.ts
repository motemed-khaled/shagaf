import 'express-async-errors';

import { Setting } from '../../models/settings.models';
import { GetSettingHandler } from '../../types/endpoints/setting.endpoint';
import { NotFoundError } from '../../utils/errors/notfound-error';



export const getSettingHandler:GetSettingHandler = async (req,res,next)=>{
  const setting = await Setting.findOne();

  if (!setting) 
    return next(new NotFoundError('setting not found'));

  res.status(200).json({message:'success' , data:setting});
};