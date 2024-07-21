import 'express-async-errors';

import { RequestHandler } from 'express';

import { AuditLog } from '../../models/bookingLog.schema';
import { GetLogierForBookingHandler } from '../../types/endpoints/roomBookingLog.endpoint';

export const getAuditLogsPagination: RequestHandler<
  unknown,
  unknown,
  unknown,
  {
    user?: string;
    action?: string;
    targetModel?: string;
    targetId?: string;
    startDate?: string;
    endDate?: string;
    details?: string;
  }
> = async (req, res, next) => {
  req.pagination = req.pagination || {};
  req.pagination.filter = {};

  if (req.query.user) {
    req.pagination.filter.user = { $eq: req.query.user };
  }

  if (req.query.action) {
    req.pagination.filter.action = { $regex: req.query.action, $options: 'i' };
  }

  if (req.query.targetModel) {
    req.pagination.filter.targetModel = { $regex: req.query.targetModel, $options: 'i' };
  }

  if (req.query.targetId) {
    req.pagination.filter.targetId = { $eq: req.query.targetId };
  }

  if (req.query.startDate) {
    req.pagination.filter.timestamp = req.pagination.filter.timestamp || {};
    req.pagination.filter.timestamp.$gte = new Date(req.query.startDate);
  }

  if (req.query.endDate) {
    req.pagination.filter.timestamp = req.pagination.filter.timestamp || {};
    req.pagination.filter.timestamp.$lte = new Date(req.query.endDate);
  }

  if (req.query.details) {
    req.pagination.filter.details = { $regex: req.query.details, $options: 'i' };
  }

  next();
};

export const getLogierForBookingHandler: GetLogierForBookingHandler = async (req, res) => {
  const logier = await AuditLog.find({ targetId: req.params.bookId, ...req.pagination.filter })
    .skip(req.pagination.skip)
    .limit(req.pagination.limit)
    .populate([{ path: 'user' }]);

  const resultCount = await AuditLog.countDocuments({
    targetId: req.params.bookId,
    ...req.pagination.filter,
  });

  res.status(200).json({
    message: 'success',
    pagination: {
      currentPage: req.pagination.page,
      resultCount,
      totalPages: Math.ceil(resultCount / req.pagination.limit),
    },
    data: logier,
  });
};
