import 'express-async-errors';

import { Location } from '../../models/location.model';
import { Slider } from '../../models/slider.model';
import { CreateSliderHandler } from '../../types/endpoints/slider.endpoints';
import { FOLDERS } from '../../types/folders';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const createSliderHandler: CreateSliderHandler = async (req, res , next) => {
  const cover = <Express.Multer.File[]>(req.files as any).cover;

  if (cover.length) req.body.cover = `/media/${FOLDERS.slider}/${cover[0].filename}`;

  const location = await Location.findById(req.body.location);
  if (!location) 
    return next(new NotFoundError('location not found'));

  const slider = await Slider.create(req.body);
  res.status(201).json({ message: 'success', data: slider });
};
