import 'express-async-errors';

import { Users } from '../../models/user.model';
import { UpdateUserHandler } from '../../types/endpoints/user.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const updateUserHandler: UpdateUserHandler = async (req, res, next) => {
  const user = await Users.findById(req.params.userId);
  if (!user) return next(new NotFoundError('user notfound'));

  const updatedUser = await Users.findByIdAndUpdate(req.params.userId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ message: 'success', data: updatedUser! });
};
