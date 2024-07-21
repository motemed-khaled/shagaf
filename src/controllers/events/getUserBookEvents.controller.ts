import 'express-async-errors';

import { EventBook } from '../../models/eventBook.model';
import { GetUserEventBookHandler } from '../../types/endpoints/event.endpoints';

export const getUserBookEventsHandler: GetUserEventBookHandler = async (req, res) => {
  const booking = await EventBook.find().populate([
    { path: 'user', select: 'email username' },
    { path: 'event' },
  ]);

  res.status(200).json({ message: 'success', data: booking });
};
