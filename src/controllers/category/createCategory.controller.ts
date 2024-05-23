import 'express-async-errors';

import { Category } from '../../models/category.model';
import { CreateCategoryHandler } from '../../types/endpoints/category.endpoints';
import { FOLDERS } from '../../types/folders';


export const createCategoryHandler:CreateCategoryHandler  =async (req,res)=>{
  const cover = <Express.Multer.File[]>(req.files as any).cover;

  if (cover.length) 
    req.body.cover = `/media/${FOLDERS.category}/${cover[0].filename}`;

  const category = await Category.create(req.body);
  res.status(201).json({message:'success' , data:category});
};