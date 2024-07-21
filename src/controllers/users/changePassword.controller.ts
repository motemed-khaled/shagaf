import 'express-async-errors';

import { Users } from '../../models/user.model';
import { ChangePasswordHandler } from '../../types/endpoints/user.endpoints';
import { comparePassword } from '../../utils/bcrypt';
import { UnauthenticatedError } from '../../utils/errors/unauthenticated-error';

export const changePasswordHandler: ChangePasswordHandler = async (req, res, next) => {
  const user = await Users.findById(req.loggedUser?.id).select('+password');

  if (!user || !(await comparePassword(req.body.oldPassword, user.password || '')))
    return next(new UnauthenticatedError('invalid old password'));

  user.password = req.body.newPassword;
  await user.save();
  res.status(200).json({ message: 'success' });
};
