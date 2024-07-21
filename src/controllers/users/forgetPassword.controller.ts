import 'express-async-errors';

import { Users, VerificationReason } from '../../models/user.model';
import {
  AskForgetPasswordHandler,
  UpdatePasswordHandler,
} from '../../types/endpoints/user.endpoints';
import { hashVerificationCode } from '../../utils/crypto';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { ServerError } from '../../utils/errors/server-error';
import { UnauthorizedError } from '../../utils/errors/un-authorizedError';
import { generateRandom6Digit } from '../../utils/gitRandom6Dugut';
import { sendEmail } from '../../utils/sendMail';

export const askForegetPasswordHandler: AskForgetPasswordHandler = async (req, res, next) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user) return next(new NotFoundError('user not found'));
  if (!user.isVerified) return next(new BadRequestError('user not verified'));
  const code = generateRandom6Digit();
  user.verificationCode = {
    code: hashVerificationCode(code),
    expireAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    reason: VerificationReason.forgetPassword,
  };

  try {
    await sendEmail({ email: user.email, subject: 'verification code', message: code });
  } catch (error) {
    user.verificationCode.code = undefined;
    user.verificationCode.expireAt = undefined;
    await user.save();
    return next(new ServerError('we have an error for sending mail'));
  }
  await user.save();
  res.status(200).json(<any>{ message: 'success', code });
};

export const updatePasswordHandler: UpdatePasswordHandler = async (req, res, next) => {
  const { email, newPassword } = req.body;
  const user = await Users.findOne({ email });
  if (!user) return next(new NotFoundError('user not found'));
  if (user.verificationCode?.reason !== VerificationReason.forgetPasswordVerified)
    return next(new UnauthorizedError());

  user.password = newPassword;
  user.verificationCode.reason = undefined;

  await user.save();
  res.status(200).json({ message: 'success' });
};
