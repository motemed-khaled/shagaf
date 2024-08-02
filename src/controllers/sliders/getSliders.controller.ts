import 'express-async-errors';

import { Slider } from '../../models/slider.model';
import { GetSlidersHandler } from '../../types/endpoints/slider.endpoints';

export const getSlidersHandler: GetSlidersHandler = async (req, res) => {
  const sliders = await Slider.find().populate('location');
  res.status(200).json({ message: 'success', data: sliders });
};
