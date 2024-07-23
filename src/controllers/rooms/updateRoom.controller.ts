import { RequestHandler } from 'express';

import 'express-async-errors';
import { Location } from '../../models/location.model';
import { Package } from '../../models/package.model';
import { Plan } from '../../models/plan.model';
import { Iroom, Room } from '../../models/rooms.model';
import { FOLDERS } from '../../types/folders';
import { successResponse } from '../../types/response';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';

export const updateRoomHandler: RequestHandler<
  { roomId: string },
  successResponse<{ data: Iroom }>,
  Partial<
    Pick<
      Iroom,
      | 'attachments'
      | 'cover'
      | 'description'
      | 'location'
      | 'packages'
      | 'seatsNum'
      | 'plans'
      | 'title'
      | 'birthDay'
    >
  >,
  unknown
> = async (req, res, next) => {
  const room = await Room.findById(req.params.roomId);
  if (!room) return next(new NotFoundError('room not found'));

  const attachments = <Express.Multer.File[] | undefined>(req.files as any).attachments;
  const cover = <Express.Multer.File[] | undefined>(req.files as any).attachments;

  if (cover && cover.length) {
    req.body.cover = `/media/${FOLDERS.room}/${cover[0].filename}`;
    Files.removeFiles(room.cover ? room.cover : undefined);
  }
  if (attachments && attachments.length) {
    req.body.attachments = attachments.map((el) => `/media/${FOLDERS.room}/${el.filename}`);
    Files.removeFiles(...room.attachments);
  }

  if (req.body.location) {
    const location = await Location.findById(req.body.location);
    if (!location) return next(new NotFoundError('location not found'));
  }

  const plans = await Plan.countDocuments({ _id: req.body.plans?.map((pl) => pl) });
  if (plans != req.body.plans?.length) return next(new BadRequestError('invalid plans'));

  const packages = await Package.countDocuments({ _id: req.body.packages?.map((pa) => pa) });
  if (packages != req.body.packages?.length) return next(new BadRequestError('invalid packages'));

  const updatedRoom = await Room.findByIdAndUpdate(req.params.roomId, req.body, { new: true });

  res.status(200).json({ message: 'success', data: updatedRoom! });
};
