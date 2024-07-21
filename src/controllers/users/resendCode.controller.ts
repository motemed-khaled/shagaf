import 'express-async-errors';

import { Users } from '../../models/user.model';
import { ResendVerificationCodeHandler } from '../../types/endpoints/user.endpoints';
import { hashVerificationCode } from '../../utils/crypto';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { ServerError } from '../../utils/errors/server-error';
import { UnauthorizedError } from '../../utils/errors/un-authorizedError';
import { generateRandom6Digit } from '../../utils/gitRandom6Dugut';
import { sendEmail } from '../../utils/sendMail';

export const resendVerificationCodeHandler: ResendVerificationCodeHandler = async (
  req,
  res,
  next,
) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user) return next(new NotFoundError('user not found'));
  if (!user.verificationCode?.reason) return next(new UnauthorizedError());
  const currentTime = Date.now();
  const expireTime = new Date(user.verificationCode.expireAt || '0').getTime();
  if (currentTime < expireTime)
    return next(
      new BadRequestError(
        `can generate code after ${Math.ceil((expireTime - currentTime) / 1000)} seconds`,
      ),
    );

  const code = generateRandom6Digit();
  user.verificationCode = {
    code: hashVerificationCode(code),
    expireAt: new Date(Date.now() + 2 * 60 * 1000).toISOString(),
    reason: user.verificationCode.reason,
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
  res.status(200).json({ message: 'success' });
};
