import 'express-async-errors';

import { DayBook } from '../../models/dayBook.model';
import { GetUserBookingHandler } from '../../types/endpoints/birthday.endpoint';

export const getUserBookingHandler: GetUserBookingHandler = async (req, res) => {
  const booking = await DayBook.find({ user: req.loggedUser?.id }).populate([
    { path: 'user', select: 'username email' },
    { path: 'products.product' },
  ]);

  res.status(200).json({ message: 'success', data: booking });
};
