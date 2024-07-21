import 'express-async-errors';

import { Location } from '../../models/location.model';
import { GetLocationsHandler } from '../../types/endpoints/location.endpoints';

export const getLocationsHandler: GetLocationsHandler = async (req, res) => {
  const locations = await Location.find();
  res.status(200).json({ message: 'success', data: locations });
};
