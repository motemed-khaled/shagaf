import 'express-async-errors';

import { RequestHandler } from 'express';

import { MemberBooking } from '../../models/memberBooking.model';
import { GetMembersBookingHandler } from '../../types/endpoints/member.endpoints';

export const getMemberBookingsPagination: RequestHandler<
  unknown,
  unknown,
  unknown,
  {
    user?: string;
    startDate?: string;
    endDate?: string;
    paid?: string;
  }
> = async (req, res, next) => {
  req.pagination = req.pagination || {};
  req.pagination.filter = {};

  if (req.query.user) {
    req.pagination.filter.user = req.query.user;
  }

  if (req.query.startDate) {
    req.pagination.filter.start = { $gte: new Date(req.query.startDate) };
  }

  if (req.query.endDate) {
    if (!req.pagination.filter.start) {
      req.pagination.filter.start = {};
    }
    req.pagination.filter.start.$lte = new Date(req.query.endDate);
  }

  if (req.query.paid) {
    req.pagination.filter.paid = req.query.paid === 'true';
  }

  next();
};

export const getAllBookingHandler: GetMembersBookingHandler = async (req, res) => {
  const booking = await MemberBooking.find(req.pagination.filter)
    .skip(req.pagination.skip)
    .limit(req.pagination.limit)
    .populate([{ path: 'member' }, { path: 'user', select: 'email username' }]);

  const resultCount = await MemberBooking.countDocuments(req.pagination.filter);

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
