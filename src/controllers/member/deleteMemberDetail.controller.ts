import 'express-async-errors';

import { Member } from '../../models/members.model';
import { DeleteMemberDetailHandler } from '../../types/endpoints/member.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const deleteMemberDetailHandler: DeleteMemberDetailHandler = async (req, res, next) => {
  const member = await Member.findById(req.params.memberId);
  if (!member) return next(new NotFoundError('member not found'));
  const index = member.details.findIndex((el: any) => el._id.toString() === req.body.detailId);
  if (index === -1) return next(new NotFoundError('detail not found'));
  member.details.splice(index, 1);
  await member.save();
  res.status(204).json({ message: 'success' });
};
