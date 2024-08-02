import 'express-async-errors';

import { Location } from '../../models/location.model';
import { Slider } from '../../models/slider.model';
import { UpdateSliderHandler } from '../../types/endpoints/slider.endpoints';
import { FOLDERS } from '../../types/folders';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';

export const updateSliderHandler: UpdateSliderHandler = async (req, res, next) => {
  const slider = await Slider.findById(req.params.sliderId);
  if (!slider) return next(new NotFoundError('slider not found'));

  const cover = <Express.Multer.File[]>(req.files as any).cover;

  if (cover?.length) {
    req.body.cover = `/media/${FOLDERS.slider}/${cover[0].filename}`;
    Files.removeFiles(slider.cover);
  } else delete req.body.cover;

  if (req.body.location) {
    const location = await Location.findById(req.body.location);
    if (!location) return next(new NotFoundError('location not found'));
  }

  const updatedSlider = await Slider.findByIdAndUpdate(req.params.sliderId, req.body, {
    new: true,
  });
  if (!updatedSlider) return next(new BadRequestError('failed to update slider'));

  res.status(200).json({ message: 'success', data: updatedSlider });
};
