import 'express-async-errors';

import { Offer } from '../../models/offers.model';
import { Users } from '../../models/user.model';
import { UpdateOfferHandler } from '../../types/endpoints/offer.endpoint';
import { FOLDERS } from '../../types/folders';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';


export const updateOfferHandler:UpdateOfferHandler = async (req,res,next)=>{
  const offer = await Offer.findById(req.params.offerId);
  if (!offer) 
    return next(new NotFoundError('offer not found'));

  if (req.body.users) {
    const usersCount = await Users.countDocuments({_id:req.body.users.map(el=>el)});
    if (req.body.users.length != usersCount) 
      return next(new BadRequestError('invalid users'));
  }

  const cover = <Express.Multer.File[]>(req.files as any).cover;

  if (cover.length){
    req.body.cover = `/media/${FOLDERS.offer}/${cover[0].filename}`;
    Files.removeFiles(offer.cover);
  }

  const updatedOffer = await Offer.findByIdAndUpdate(req.params.offerId , req.body , {new:true});
  if (!updatedOffer) 
    return next(new BadRequestError('failed to update offer'));

  res.status(200).json({message:'success' , data:updatedOffer});

};