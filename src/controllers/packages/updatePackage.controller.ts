import 'express-async-errors';

import { Package } from '../../models/package.model';
import { Product } from '../../models/product.model';
import { UpdatePackageHandler } from '../../types/endpoints/package.endpoints';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const updatePackageHandler: UpdatePackageHandler = async (req, res, next) => {
  if (req.body.products) {
    const productCount = await Product.countDocuments({
      _id: req.body.products.map((el) => el.product),
    });
    if (productCount != req.body.products.length)
      return next(new BadRequestError('invalid products'));
  }

  const updatedPackage = await Package.findByIdAndUpdate(req.params.packageId, req.body, {
    new: true,
  });

  if (!updatedPackage) return next(new NotFoundError('package not found'));

  res.status(200).json({ message: 'success', data: updatedPackage });
};
