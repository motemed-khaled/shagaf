import { RequestHandler } from 'express';

import 'express-async-errors';
import { Package } from '../../models/package.model';
import {
  BookType,
  IRoomBooking,
  ReservationType,
  RoomBooking,
} from '../../models/roomBooking.model';
import { Room } from '../../models/rooms.model';
import { Users } from '../../models/user.model';
import { successResponse } from '../../types/response';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const openNewBookHandler: RequestHandler<
  unknown,
  successResponse<{ data: IRoomBooking }>,
  Partial<Pick<IRoomBooking, 'start' | 'package' | 'room' | 'user' | 'seatsCount'>>,
  unknown
> = async (req, res, next) => {
  const user = await Users.findById(req.body.user);
  if (!user) return next(new NotFoundError('user not found'));

  const room = await Room.findById(req.body.room);
  if (!room) return next(new NotFoundError('room not found'));

  if (room.seatsAvailable < req.body.seatsCount!)
    return next(new BadRequestError('no seats avaliable in this room right now'));

  const existPackage = await Package.findById(req.body.package);

  if (!existPackage) 
    return next(new NotFoundError('package not found'));

  const book = await RoomBooking.create({
    ...req.body,
    type: BookType.onsite,
    reservationType: ReservationType.shared,
    start: Date.now()
  });

  res.status(201).json({ message: 'success', data: book });
};
