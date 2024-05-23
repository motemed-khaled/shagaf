import 'express-async-errors';

import { Offer } from '../../models/offers.model';
import { DeleteOfferHandler } from '../../types/endpoints/offer.endpoint';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';



export const deleteOfferHandler:DeleteOfferHandler = async (req,res,next)=>{
  const deletedOffer = await Offer.findByIdAndDelete(req.params.offerId);

  if (!deletedOffer) 
    return next(new NotFoundError('offer not found'));

  Files.removeFiles(deletedOffer.cover);
  res.status(204).json({message:'success'});
};