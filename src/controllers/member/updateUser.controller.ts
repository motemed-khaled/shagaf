import { RequestHandler } from 'express';

import 'express-async-errors';
import { MemberBooking } from '../../models/memberBooking.model';
import { Users } from '../../models/user.model';
import { successResponse } from '../../types/response';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const UpdateUserHandler: RequestHandler<
  unknown,
  successResponse,
  { user: string },
  unknown
> = async (req, res, next) => {
  const user = await Users.findById(req.body.user);
  if (!user) 
    return next(new NotFoundError('user not found'));

  const member = await MemberBooking.findOne({user:req.body.user , end:{$gt:new Date()}});
  if (!member) 
    return next(new NotFoundError('user dont member'));

  if (user.member.count > 0 && user.member.endAt! > new Date()) 
    user.member.count = user.member.count - 1;
  else{
    user.member.count = 0;
    user.member.endAt = null;
  }
  
};
