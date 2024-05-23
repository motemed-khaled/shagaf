import 'express-async-errors';

import { Category } from '../../models/category.model';
import { GetCategoriesHandler } from '../../types/endpoints/category.endpoints';


export const getCategoriesHandler:GetCategoriesHandler = async(req,res)=>{
  const categories = await Category.find().limit(req.pagination.limit).skip(req.pagination.skip);

  const resultCount = await Category.find().countDocuments();

  res.status(200).json({
    message:'success',
    pagination:{
      currentPage:req.pagination.page,
      resultCount , 
      totalPages:Math.ceil(resultCount / req.pagination.limit)
    },
    data:categories
  });
};