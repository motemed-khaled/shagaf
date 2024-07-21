import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';

import { Users } from '../models/user.model';
import { IjwtPayload } from '../types/jwt';
import { UnauthorizedError } from '../utils/errors/un-authorizedError';
import { UnauthenticatedError } from '../utils/errors/unauthenticated-error';

export const isauthenticated: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return next(new UnauthenticatedError('token not found'));

  let payload: IjwtPayload;
  try {
    payload = <IjwtPayload>verify(token, process.env.JWT_KEY!);
    req.loggedUser = payload;

    const user = await Users.findById(payload.id);
    if (!user) return next(new UnauthenticatedError('invalid user'));
    if (!user.isVerified)
      return next(
        new UnauthorizedError(`user not verified reason ${user.verificationCode?.reason}`),
      );
  } catch (error) {
    return res.status(423).json({ message: 'token expired' });
  }
  next();
};
