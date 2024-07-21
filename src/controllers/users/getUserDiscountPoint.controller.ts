import 'express-async-errors';

import { Users } from '../../models/user.model';
import { GetUserPointsDiscountHandler } from '../../types/endpoints/user.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const getUserPointDiscountHandler: GetUserPointsDiscountHandler = async (req, res, next) => {
  const user = await Users.findById(req.params.userId);
  if (!user) return next(new NotFoundError('user not found'));

  const discount = (user.point / 1000) * 10;
  res.status(200).json({ message: 'success', data: { discount } });
};
