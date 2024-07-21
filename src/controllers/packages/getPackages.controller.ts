import 'express-async-errors';

import { Package } from '../../models/package.model';
import { GetPackagesHandler } from '../../types/endpoints/package.endpoints';

export const getPackagesHandler: GetPackagesHandler = async (req, res) => {
  const packages = await Package.find(req.pagination.filter)
    .skip(req.pagination.skip)
    .limit(req.pagination.limit)
    .populate([{ path: 'products.product' }]);

  const resultCount = await Package.countDocuments(req.pagination.filter);

  res.status(200).json({
    message: 'success',
    pagination: {
      currentPage: req.pagination.page,
      resultCount,
      totalPages: Math.ceil(resultCount / req.pagination.limit),
    },
    data: packages,
  });
};
