import 'express-async-errors';

import { Location } from '../../models/location.model';
import { UpdateLocationHandler } from '../../types/endpoints/location.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const updateLocationHandler: UpdateLocationHandler = async (req, res, next) => {
  const location = await Location.findByIdAndUpdate(req.params.locationId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!location) return next(new NotFoundError('location not found'));
  res.status(200).json({ message: 'success', data: location });
};
