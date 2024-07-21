import 'express-async-errors';

import { MemberBooking } from '../../models/memberBooking.model';
import { GetLoggedUserMemberBookingHandler } from '../../types/endpoints/member.endpoints';

export const getUserBookingHandler: GetLoggedUserMemberBookingHandler = async (req, res) => {
  const booking = await MemberBooking.find()
    .skip(req.pagination.skip)
    .limit(req.pagination.limit)
    .populate([{ path: 'member' }, { path: 'user', select: 'email username' }]);

  const resultCount = await MemberBooking.find().countDocuments();

  res.status(200).json({
    message: 'success',
    pagination: {
      currentPage: req.pagination.page,
      resultCount,
      totalPages: Math.ceil(resultCount / req.pagination.limit),
    },
    data: booking,
  });
};
