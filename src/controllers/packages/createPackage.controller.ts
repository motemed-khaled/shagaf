import 'express-async-errors';

import { Package } from '../../models/package.model';
import { Product } from '../../models/product.model';
import { CreatePackageHandler } from '../../types/endpoints/package.endpoints';
import { BadRequestError } from '../../utils/errors/bad-request-error';

export const createPackageHandler: CreatePackageHandler = async (req, res, next) => {
  const productCount = await Product.countDocuments({
    _id: req.body.products.map((el) => el.product),
  });

  if (productCount != req.body.products.length)
    return next(new BadRequestError('invalid products'));

  const packages = await Package.create(req.body);
  res.status(200).json({ message: 'success', data: packages });
};
