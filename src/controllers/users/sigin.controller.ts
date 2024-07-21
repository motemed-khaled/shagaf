import 'express-async-errors';

import { Users } from '../../models/user.model';
import { SigInHandler } from '../../types/endpoints/user.endpoints';
import { comparePassword } from '../../utils/bcrypt';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { UnauthorizedError } from '../../utils/errors/un-authorizedError';
import { generateToken } from '../../utils/generateToken';

export const siginHandler: SigInHandler = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await Users.findOne({ email }).select('+password');
  if (!user || !(await comparePassword(password, user.password || '')))
    return next(new UnauthorizedError());
  if (!user.isVerified)
    return next(
      new BadRequestError(`Account not verified reason : ${user.verificationCode?.reason}`),
    );

  const token = generateToken({ id: user._id.toString() });
  user.token = token;
  await user.save();
  user.password = '';
  res.status(200).json({ message: 'success', data: user });
};
