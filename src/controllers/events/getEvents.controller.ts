import 'express-async-errors';

import { RequestHandler } from 'express';

import { Event } from '../../models/event.model';
import { GetEventsHandler } from '../../types/endpoints/event.endpoints';

export const getEventsPagination: RequestHandler<
  unknown,
  unknown,
  unknown,
  {
    title?: string;
    location?: string;
    cost?: number;
    details?: string;
    startDate?: string;
    endDate?: string;
  }
> = async (req, res, next) => {
  req.pagination.filter = {};

  if (req.query.title) {
    req.pagination.filter.title = { $regex: req.query.title, $options: 'i' };
  }

  if (req.query.location) {
    req.pagination.filter.location = {
      $in: Array.isArray(req.query.location) ? req.query.location : [req.query.location],
    };
  }

  if (req.query.cost) {
    req.pagination.filter.cost = { $gte: Number(req.query.cost) };
  }

  if (req.query.details) {
    req.pagination.filter['details.title'] = { $regex: req.query.details, $options: 'i' };
  }

  if (req.query.startDate && req.query.endDate) {
    req.pagination.filter.date = {
      $gte: new Date(req.query.startDate),
      $lte: new Date(req.query.endDate),
    };
  } else if (req.query.startDate) {
    req.pagination.filter.date = { $gte: new Date(req.query.startDate) };
  } else if (req.query.endDate) {
    req.pagination.filter.date = { $lte: new Date(req.query.endDate) };
  }
  next();
};

export const getEventsHandler: GetEventsHandler = async (req, res) => {
  const events = await Event.find(req.pagination.filter)
    .limit(req.pagination.limit)
    .skip(req.pagination.skip);

  const resultCount = await Event.find(req.pagination.filter).countDocuments();

  res.status(200).json({
    message: 'success',
    pagination: {
      currentPage: req.pagination.page,
      resultCount,
      totalPages: Math.ceil(resultCount / req.pagination.limit),
    },
    data: events,
  });
};
