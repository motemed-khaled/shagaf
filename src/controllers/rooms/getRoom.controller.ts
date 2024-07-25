import { RequestHandler } from 'express';

import 'express-async-errors';
import { Iroom, Room } from '../../models/rooms.model';
import { successResponse } from '../../types/response';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const getRoomHandler: RequestHandler<
  { roomId: string },
  successResponse<{ data: Iroom }>,
  unknown,
  unknown
> = async (req, res, next) => {
  const rooms = await Room.findById(req.params.roomId)
    .populate([{ path: 'packages' }, { path: 'plans' }, { path: 'location' }]);

  if (!rooms) return next(new NotFoundError('room not found'));

  res.status(200).json({ message: 'success', data: rooms });
};
