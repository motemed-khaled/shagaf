import 'express-async-errors';

import { Event } from '../../models/event.model';
import { Location } from '../../models/location.model';
import { UpdateEventHandler } from '../../types/endpoints/event.endpoints';
import { FOLDERS } from '../../types/folders';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';

export const updateEventHandler: UpdateEventHandler = async (req, res, next) => {
  const event = await Event.findById(req.params.eventId);
  if (!event) return next(new NotFoundError('event not found'));

  const cover = <Express.Multer.File[]>(req.files as any).cover;

  if (cover?.length) {
    req.body.cover = `/media/${FOLDERS.event}/${cover[0].filename}`;
    Files.removeFiles(event.cover);
  } else delete req.body.cover;

  if (req.body.location) {
    const location = await Location.findById(req.body.location);
    if (!location) 
      return next(new NotFoundError('location not found'));
  }

  const updatedEvent = await Event.findByIdAndUpdate(req.params.eventId, req.body, { new: true });
  if (!updatedEvent) return next(new BadRequestError('failed to update event'));

  res.status(200).json({ message: 'success', data: updatedEvent });
};
