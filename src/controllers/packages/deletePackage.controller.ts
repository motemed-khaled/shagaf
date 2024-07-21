import 'express-async-errors';

import { Package } from '../../models/package.model';
import { DeletePackageHandler } from '../../types/endpoints/package.endpoints';

export const deletePackageHandler: DeletePackageHandler = async (req, res) => {
  await Package.findByIdAndDelete(req.params.packageId);
  res.status(204).json({ message: 'success' });
};
