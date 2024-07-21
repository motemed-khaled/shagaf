import 'express-async-errors';

import { Advertisement } from '../../models/advertisment.model';
import { GetAddsHandler } from '../../types/endpoints/advertisment.endpoint';

export const getAddsHandler: GetAddsHandler = async (req, res) => {
  const adds = await Advertisement.find();
  res.status(200).json({ message: 'success', data: adds });
};
