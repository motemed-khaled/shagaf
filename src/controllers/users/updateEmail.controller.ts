import 'express-async-errors';

import { Users, VerificationReason } from '../../models/user.model';
import { AskUpdateEmailHandler, UpdateEmailHandler } from '../../types/endpoints/user.endpoints';
import { hashVerificationCode } from '../../utils/crypto';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { ServerError } from '../../utils/errors/server-error';
import { UnauthorizedError } from '../../utils/errors/un-authorizedError';
import { generateRandom6Digit } from '../../utils/gitRandom6Dugut';
import { sendEmail } from '../../utils/sendMail';

export const askUpdateEmailHandler: AskUpdateEmailHandler = async (req, res, next) => {
  const user = await Users.findById(req.loggedUser?.id);
  if (!user) return next(new UnauthorizedError());

  const randomCode = generateRandom6Digit();
  const hashedRandomCode = hashVerificationCode(randomCode);

  user.verificationCode = {
    code: hashedRandomCode,
    expireAt: new Date(Date.now() + 60 * 1000).toString(),
    reason: VerificationReason.updateOldEmai,
  };

  try {
    await sendEmail({ email: user.email, subject: 'verification code', message: randomCode });
  } catch (error) {
    user.verificationCode.code = undefined;
    user.verificationCode.expireAt = undefined;
    await user.save();
    return next(new ServerError('we have an error for sending mail'));
  }

  await user.save();
  res.status(200).json(<any>{ message: 'success', randomCode });
};

export const updateEmailHandler: UpdateEmailHandler = async (req, res, next) => {
  const user = await Users.findById(req.loggedUser?.id);
  if (!user) return next(new NotFoundError());
  if (user.verificationCode?.reason !== VerificationReason.updateOldEmailVerified)
    return next(new UnauthorizedError());

  const verificationCode: string = generateRandom6Digit();
  const hashedVerificationCode: string = hashVerificationCode(verificationCode);

  user.email = req.body.newEmail;

  user.verificationCode = {
    reason: VerificationReason.updateNewEmail,
    code: hashedVerificationCode,
    expireAt: new Date(Date.now() + 60 * 1000).toString(),
  };
  user.isVerified = false;
  user.token = undefined;
  await user.save();

  res.status(200).json(<any>{ message: 'success', verificationCode });
};
