import 'express-async-errors';

import { RequestHandler } from 'express';

import { Offer } from '../../models/offers.model';
import { GetOffersHandler } from '../../types/endpoints/offer.endpoint';

export const getOffersPagination: RequestHandler<
  unknown,
  unknown,
  unknown,
  {
    title?: string;
    name?: string;
    discount?: number;
    bookingNum?: number;
    from?: Date;
    to?: Date;
  }
> = async (req, res, next) => {
  req.pagination.filter = {};

  if (req.query.title) {
    req.pagination.filter.title = { $regex: req.query.title, $options: 'i' };
  }

  if (req.query.name) {
    req.pagination.filter.name = { $regex: req.query.name, $options: 'i' };
  }

  if (req.query.discount) {
    req.pagination.filter.discount = { $gte: Number(req.query.discount) };
  }

  if (req.query.bookingNum) {
    req.pagination.filter.bookingNum = { $gte: Number(req.query.bookingNum) };
  }

  if (req.query.from) {
    req.pagination.filter.from = { $gte: new Date(req.query.from) };
  }

  if (req.query.to) {
    req.pagination.filter.to = { $lte: new Date(req.query.to) };
  }

  next();
};

export const getOffersHandler: GetOffersHandler = async (req, res) => {
  const offers = await Offer.find(req.pagination.filter)
    .limit(req.pagination.limit)
    .skip(req.pagination.skip)
    .populate('users');

  const resultCount = await Offer.find().countDocuments(req.pagination.filter);
  res.status(200).json({
    message: 'success',
    pagination: {
      currentPage: req.pagination.page,
      resultCount,
      totalPages: Math.ceil(resultCount / req.pagination.limit),
    },
    data: offers,
  });
};
