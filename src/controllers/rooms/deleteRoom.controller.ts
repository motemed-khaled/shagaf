import { RequestHandler } from 'express';

import 'express-async-errors';
import { Room } from '../../models/rooms.model';
import { successResponse } from '../../types/response';

export const deleteRoomHandler: RequestHandler<
  { roomId: string },
  successResponse,
  unknown,
  unknown
> = async (req, res) => {
  await Room.findByIdAndDelete(req.params.roomId);
  res.status(204).json({ message: 'success' });
};
