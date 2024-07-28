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

export const createRoomHandler: RequestHandler<
  unknown,
  successResponse<{ data: Iroom }>,
  Pick<
    Iroom,
    | 'attachments'
    | 'cover'
    | 'description'
    | 'location'
    | 'packages'
    | 'plans'
    | 'seatsNum'
    | 'title'
    | 'birthDay'
    | 'seatsAvailable'
  >,
  unknown
> = async (req, res, next) => {
  const attachments = <Express.Multer.File[]>(req.files as any).attachments;
  const cover = <Express.Multer.File[]>(req.files as any).cover;

  if (cover.length) req.body.cover = `/media/${FOLDERS.room}/${cover[0].filename}`;
  if (attachments.length)
    req.body.attachments = attachments.map((el) => `/media/${FOLDERS.room}/${el.filename}`);

  const location = await Location.findById(req.body.location);
  if (!location) return next(new NotFoundError('location not found'));

  const plans = await Plan.countDocuments({ _id: req.body.plans.map((pl) => pl) });
  if (plans != req.body.plans.length) return next(new BadRequestError('invalid plans'));

  const packages = await Package.countDocuments({ _id: req.body.packages.map((pa) => pa) });
  if (packages != req.body.packages.length) return next(new BadRequestError('invalid packages'));

  req.body.seatsAvailable = req.body.seatsNum;
  const room = await Room.create(req.body);

  res.status(201).json({ message: 'success', data: room });
};
