import 'express-async-errors';

import { Slider } from '../../models/slider.model';
import { GetSliderHandler } from '../../types/endpoints/slider.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';


export const getSliderHandler:GetSliderHandler = async (req,res,next)=>{
  const slider = await Slider.findById(req.params.sliderId);
  if (!slider) 
    return next(new NotFoundError('slider not found'));

  res.status(200).json({message:'success' , data:slider});
};