import 'express-async-errors';

import { Users } from '../../models/user.model';
import { UpdateLoggedUserHandler } from '../../types/endpoints/user.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const updateLoggedUserHandler: UpdateLoggedUserHandler = async (req, res, next) => {
  const user = await Users.findByIdAndUpdate(req.loggedUser?.id, req.body, { new: true });

  if (!user) return next(new NotFoundError('user not found'));

  res.status(200).json({ message: 'success', data: user });
};
