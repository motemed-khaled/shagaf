import 'express-async-errors';

import { Member } from '../../models/members.model';
import { GetMemberHandler } from '../../types/endpoints/member.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const getMemberHandler: GetMemberHandler = async (req, res, next) => {
  const member = await Member.findById(req.params.memberId);
  if (!member) return next(new NotFoundError('member not found'));

  res.status(200).json({ message: 'success', data: member });
};
