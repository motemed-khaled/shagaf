import 'express-async-errors';

import mongoose from 'mongoose';

import { Offer } from '../../models/offers.model';
import { GetLoggedUserOfferHandler } from '../../types/endpoints/offer.endpoint';

export const getLoggedUserOffersHandler: GetLoggedUserOfferHandler = async (req, res) => {
  const offers = await Offer.find({
    users: { $in: [new mongoose.Types.ObjectId(req.loggedUser?.id)] },
  })
    .limit(req.pagination.limit)
    .skip(req.pagination.skip);

  const resultCount = await Offer.find({
    users: { $in: [new mongoose.Types.ObjectId(req.loggedUser?.id)] },
  }).countDocuments();

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
