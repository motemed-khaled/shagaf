import 'express-async-errors';

import { Slider } from '../../models/slider.model';
import { DeleteSliderHandler } from '../../types/endpoints/slider.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';

export const deleteSliderHandler: DeleteSliderHandler = async (req, res, next) => {
  const slider = await Slider.findByIdAndDelete(req.params.sliderId);
  if (!slider) return next(new NotFoundError('slider not found'));

  Files.removeFiles(slider?.cover);
  res.status(204).json({ message: 'success' });
};
