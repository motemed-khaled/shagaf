import 'express-async-errors';

import { Slider } from '../../models/slider.model';
import { CreateSliderHandler } from '../../types/endpoints/slider.endpoints';
import { FOLDERS } from '../../types/folders';


export const createSliderHandler :CreateSliderHandler = async (req,res)=>{
  const cover = <Express.Multer.File[]>(req.files as any).cover;

  if (cover.length) 
    req.body.cover = `/media/${FOLDERS.slider}/${cover[0].filename}`;
  
  const slider = await Slider.create(req.body);
  res.status(201).json({message:'success' , data:slider});
};