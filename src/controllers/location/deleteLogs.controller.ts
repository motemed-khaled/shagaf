import 'express-async-errors';

import { Location } from '../../models/location.model';
import { DeleteLocationHandler } from '../../types/endpoints/location.endpoints';

export const deleteLocationHandler: DeleteLocationHandler = async (req, res) => {
  await Location.findByIdAndDelete(req.params.locationId);
  res.status(204).json({ message: 'success' });
};
