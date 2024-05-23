import 'express-async-errors';

import { Product } from '../../models/product.model';
import { UpdateProductHandler } from '../../types/endpoints/product.endpoints';
import { FOLDERS } from '../../types/folders';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';



export const updateProductHandler:UpdateProductHandler = async (req,res,next)=>{
  const product = await Product.findById(req.params.productId);
  if (!product) 
    return next(new NotFoundError('product notfound'));

  const cover = <Express.Multer.File[]>(req.files as any).cover;

  if (cover?.length){
    req.body.cover = `/media/${FOLDERS.product}/${cover[0].filename}`;
    Files.removeFiles(product.cover);
  }
  const updatedProduct = await Product.findByIdAndUpdate(req.params.productId , req.body , {new:true});
  if (!updatedProduct) 
    return next(new BadRequestError('product not found'));

  res.status(200).json({message:'success' , data:updatedProduct});
};