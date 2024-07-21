import 'express-async-errors';

import { RequestHandler } from 'express';

import { EventBook } from '../../models/eventBook.model';
import { GetEventsBookHandler } from '../../types/endpoints/event.endpoints';

export const getEventBooksPagination: RequestHandler<
  unknown,
  unknown,
  unknown,
  {
    user?: string;
    event?: string;
    date?: string;
    totalPriceMin?: number;
    totalPriceMax?: number;
  }
> = async (req, res, next) => {
  req.pagination.filter = {};

  const { user, event, date, totalPriceMin, totalPriceMax } = req.query;

  if (user) {
    req.pagination.filter.user = user;
  }

  if (event) {
    req.pagination.filter.event = event;
  }

  if (date) {
    req.pagination.filter.date = new Date(date);
  }

  if (totalPriceMin !== undefined) {
    req.pagination.filter.totalPrice = req.pagination.filter.totalPrice || {};
    req.pagination.filter.totalPrice.$gte = Number(totalPriceMin);
  }

  if (totalPriceMax !== undefined) {
    req.pagination.filter.totalPrice = req.pagination.filter.totalPrice || {};
    req.pagination.filter.totalPrice.$lte = Number(totalPriceMax);
  }

  next();
};

export const getEventsBookingHandler: GetEventsBookHandler = async (req, res) => {
  const booking = await EventBook.find(req.pagination.filter).populate([
    { path: 'user', select: 'email username' },
    { path: 'event' },
  ]);

  const resultCount = await EventBook.find(req.pagination.filter).countDocuments();

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
