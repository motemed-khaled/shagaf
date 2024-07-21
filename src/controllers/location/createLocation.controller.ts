import 'express-async-errors';

import { Location } from '../../models/location.model';
import { CreateLocationHandler } from '../../types/endpoints/location.endpoints';

export const createLocationHandler: CreateLocationHandler = async (req, res) => {
  const location = await Location.create(req.body);
  res.status(200).json({ message: 'success', data: location });
};
