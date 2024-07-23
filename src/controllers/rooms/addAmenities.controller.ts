import { RequestHandler } from 'express';

import 'express-async-errors';
import { Iroom, Room } from '../../models/rooms.model';
import { FOLDERS } from '../../types/folders';
import { successResponse } from '../../types/response';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const addAmenitiesHandler: RequestHandler<
  { roomId: string },
  successResponse<{ data: Iroom }>,
  { title: string },
  unknown
> = async (req, res, next) => {
  const room = await Room.findById(req.params.roomId);
  if (!room) return next(new NotFoundError('room not found'));

  const image = <Express.Multer.File[]>(req.files as any).image;

  const newAmenity = {
    image: `/media/${FOLDERS.room}/${image[0].filename}`,
    title: req.body.title,
  };

  const updatedRoom = await Room.findByIdAndUpdate(
    req.params.roomId,
    { $push: { amenities: newAmenity } },
    { new: true },
  );

  res.status(200).json({ message: 'success', data: updatedRoom! });
};
