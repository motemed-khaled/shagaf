import 'express-async-errors';

import { Event } from '../../models/event.model';
import { Location } from '../../models/location.model';
import { CreateEventHandler } from '../../types/endpoints/event.endpoints';
import { FOLDERS } from '../../types/folders';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const createEventHandler: CreateEventHandler = async (req, res , next) => {
  const cover = <Express.Multer.File[]>(req.files as any).cover;
  if (cover.length) req.body.cover = `/media/${FOLDERS.event}/${cover[0].filename}`;

  const location = await Location.findById(req.body.location);
  if (!location) 
    return next(new NotFoundError('location not found'));

  const event = await Event.create(req.body);
  res.status(201).json({ message: 'success', data: event });
};
