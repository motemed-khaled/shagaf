import 'express-async-errors';

import { Event } from '../../models/event.model';
import { GetEventHandler } from '../../types/endpoints/event.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const getEventHandler: GetEventHandler = async (req, res, next) => {
  const event = await Event.findById(req.params.eventId);
  if (!event) return next(new NotFoundError('event not found'));
  res.status(200).json({ message: 'success', data: event });
};
