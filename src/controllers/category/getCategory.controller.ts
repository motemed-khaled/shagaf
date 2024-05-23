import 'express-async-errors';

import { Category } from '../../models/category.model';
import { GetCategoryHandler } from '../../types/endpoints/category.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';



export const getCategoryHandler:GetCategoryHandler = async (req,res,next)=>{
  const category = await Category.findById(req.params.categoryId);
  if (!category) 
    return next(new NotFoundError('category not found'));
  res.status(200).json({message:'success' , data:category});
};