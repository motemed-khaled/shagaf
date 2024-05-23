import 'express-async-errors';

import { BirthDay } from '../../models/birthDay.model';
import { CreateDayHandler } from '../../types/endpoints/birthday.endpoint';
import { FOLDERS } from '../../types/folders';



export const createDayHandler:CreateDayHandler = async (req,res)=>{
  const cover = <Express.Multer.File[]>(req.files as any).cover;

  if (cover.length) 
    req.body.cover = `/media/${FOLDERS.birthday}/${cover[0].filename}`;

  const day = await BirthDay.create(req.body);
  res.status(201).json({message:'success' , data:day});
};