import { RequestHandler } from 'express';

import 'express-async-errors';
import { IRoomBooking, RoomBooking } from '../../models/roomBooking.model';
import { PaginationResponse } from '../../types/response';

export const getUserBookHandler: RequestHandler<
  unknown,
  PaginationResponse<{ data: IRoomBooking[] }>,
  unknown,
  unknown
> = async (req, res) => {
  const book = await RoomBooking.find({ ...req.pagination.filter, user: req.loggedUser?.id })
    .sort({ createdAt: -1 })
    .skip(req.pagination.skip)
    .limit(req.pagination.limit)
    .populate([
      { path: 'package' },
      { path: 'plan' },
      { path: 'room' },
      { path: 'user' },
      { path: 'products.product' },
    ]);

  const resultCount = await RoomBooking.countDocuments({
    ...req.pagination.filter,
    user: req.loggedUser?.id,
  });

  res.status(200).json({
    message: 'success',
    pagination: {
      currentPage: req.pagination.page,
      resultCount,
      totalPages: Math.ceil(resultCount / req.pagination.limit),
    },
    data: book,
  });
};
