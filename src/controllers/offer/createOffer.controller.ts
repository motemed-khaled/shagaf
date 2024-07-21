import 'express-async-errors';

import { Offer } from '../../models/offers.model';
import { Users } from '../../models/user.model';
import { CreateOfferHandler } from '../../types/endpoints/offer.endpoint';
import { FOLDERS } from '../../types/folders';
import { BadRequestError } from '../../utils/errors/bad-request-error';

export const createOfferHandler: CreateOfferHandler = async (req, res, next) => {
  const cover = <Express.Multer.File[]>(req.files as any).cover;

  if (req.body.birthDay) {
    const date = new Date(req.body.birthDay);
    const startOfDay = new Date(date.setUTCHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setUTCHours(24, 0, 0, 0));
    const users = await Users.find({
      birthdate: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    users.forEach((user) => req.body.users.push(user._id));
  }

  if (req.body.users) {
    const usersCount = await Users.countDocuments({ _id: req.body.users.map((el) => el) });
    if (req.body.users.length != usersCount) return next(new BadRequestError('invalid users'));
  }

  if (cover.length) req.body.cover = `/media/${FOLDERS.offer}/${cover[0].filename}`;

  const offer = await Offer.create(req.body);
  res.status(201).json({ message: 'success', data: offer });
};
