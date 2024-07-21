import 'express-async-errors';

import { Package } from '../../models/package.model';
import { GetPackageHandler } from '../../types/endpoints/package.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const getPackageHandler: GetPackageHandler = async (req, res, next) => {
  const packages = await Package.findById(req.params.packageId).populate([
    { path: 'products.product' },
  ]);

  if (!packages) return next(new NotFoundError('package not found'));

  res.status(200).json({ message: 'success', data: packages });
};
