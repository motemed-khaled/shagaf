import 'express-async-errors';

import { Product } from '../../models/product.model';
import { DeleteProductHandler } from '../../types/endpoints/product.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';


export const deleteProductHandler : DeleteProductHandler  =async (req,res,next)=>{
  const deletedProduct = await Product.findByIdAndDelete(req.params.productId);

  if (!deletedProduct) 
    return next(new NotFoundError('product not found'));

  Files.removeFiles(deletedProduct.cover);

  res.status(204).json({message:'success'});
};