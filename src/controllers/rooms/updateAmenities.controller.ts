import { RequestHandler } from 'express';

import 'express-async-errors';
import { Iroom, Room } from '../../models/rooms.model';
import { FOLDERS } from '../../types/folders';
import { successResponse } from '../../types/response';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';

export const updateAmenitiesHandler: RequestHandler<
  { roomId: string; amenitiesId: string },
  successResponse<{ data: Iroom }>,
  { title: string; image: string },
  unknown
> = async (req, res, next) => {
  const room = await Room.findById(req.params.roomId);

  if (!room) return next(new NotFoundError('room not found'));

  const index = room.amenities.findIndex((el: any) => el._id.toString() === req.params.amenitiesId);

  if (index === -1) return next(new NotFoundError('amenities not found'));

  const image = <Express.Multer.File[] | undefined>(req.files as any).image;

  if (image && image.length) {
    Files.removeFiles(room.amenities[index].image ? room.amenities[index].image : undefined);
    room.amenities[index].image = `/media/${FOLDERS.room}/${image[0].filename}`;
  }

  if (req.body.title) room.amenities[index].title = req.body.title;

  await room.save();

  res.status(200).json({ message: 'success', data: room });
};
