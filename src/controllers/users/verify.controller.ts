import 'express-async-errors';

import { Users, VerificationReason } from '../../models/user.model';
import { VerifyUserHandler } from '../../types/endpoints/user.endpoints';
import { hashVerificationCode } from '../../utils/crypto';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { UnauthorizedError } from '../../utils/errors/un-authorizedError';

export const verifyUserHandler: VerifyUserHandler = async (req, res, next) => {
  const { code, email } = req.body;
  const user = await Users.findOne({ email });
  if (!user) return next(new NotFoundError(`user not found ${email}`));

  if (!user.verificationCode?.code) return next(new UnauthorizedError());
  const currentTime = Date.now();
  const expireTime = new Date(user.verificationCode.expireAt || '0').getTime();
  if (currentTime > expireTime) return next(new BadRequestError('token expired'));
  if (user.verificationCode.code !== hashVerificationCode(code))
    return next(new BadRequestError('invalid code'));
  user.verificationCode.code = undefined;
  user.verificationCode.expireAt = undefined;

  if (user.verificationCode.reason === VerificationReason.updateOldEmai)
    user.verificationCode.reason = VerificationReason.updateOldEmailVerified;
  else if (user.verificationCode.reason === VerificationReason.forgetPassword)
    user.verificationCode.reason = VerificationReason.forgetPasswordVerified;
  else {
    user.isVerified = true;
    user.verificationCode.reason = undefined;
  }

  await user.save();
  res.status(200).json({
    email: user.email,
    reason: user.verificationCode.reason as string,
    message: 'success',
  });
};
