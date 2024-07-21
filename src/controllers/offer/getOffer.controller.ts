import 'express-async-errors';

import { Offer } from '../../models/offers.model';
import { GetOfferHandler } from '../../types/endpoints/offer.endpoint';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const getOfferHandler: GetOfferHandler = async (req, res, next) => {
  const offer = await Offer.findById(req.params.offerId).populate('users');
  if (!offer) return next(new NotFoundError('offer not found'));

  res.status(200).json({ message: 'success', data: offer });
};
