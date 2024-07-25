import { RequestHandler } from 'express';

import 'express-async-errors';
import { Room } from '../../models/rooms.model';
import { successResponse } from '../../types/response';
import { Files } from '../../utils/file';

export const deleteRoomHandler: RequestHandler<
  { roomId: string },
  successResponse,
  unknown,
  unknown
> = async (req, res) => {
  const room = await Room.findByIdAndDelete(req.params.roomId);
  if (room) {
    Files.removeFiles(...room.attachments, room.cover);
    if (room.amenities && room.amenities.length)
      room.amenities.forEach((el) => Files.removeFiles(el.image));
  }
  res.status(204).json({ message: 'success' });
};
