import 'express-async-errors';

import { Location } from '../../models/location.model';
import { GetLocationHandler } from '../../types/endpoints/location.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const getLocationHandler: GetLocationHandler = async (req, res, next) => {
  const location = await Location.findById(req.params.locationId);
  if (!location) return next(new NotFoundError('location not found'));

  res.status(200).json({ message: 'success', data: location });
};
