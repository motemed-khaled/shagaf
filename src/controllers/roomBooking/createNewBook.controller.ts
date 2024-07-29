import { RequestHandler } from 'express';

import 'express-async-errors';
import { Package } from '../../models/package.model';
import { Plan, PlanTypes } from '../../models/plan.model';
import { IRoomBooking, ReservationType, RoomBooking } from '../../models/roomBooking.model';
import { Room } from '../../models/rooms.model';
import { Setting } from '../../models/settings.models';
import { Users } from '../../models/user.model';
import { successResponse } from '../../types/response';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const createNewBookHandler: RequestHandler<
  unknown,
  successResponse<{ data: IRoomBooking }>,
  Partial<
    Pick<
      IRoomBooking,
      'start' | 'end' | 'plan' | 'package' | 'room' | 'user' | 'reservationType' | 'seatsCount'
    >
  >,
  unknown
> = async (req, res, next) => {
  const startDate: Date = new Date(req.body.start!);
  const endDate: Date = new Date(req.body.end!);

  const differenceInMilliseconds: number = endDate.getTime() - startDate.getTime();
  const differenceInHours: number = differenceInMilliseconds / (1000 * 60 * 60);

  if (differenceInHours > 24)
    return next(new BadRequestError('reservation hours must be less than 24 hour'));

  const room = await Room.findById(req.body.room);
  if (!room) return next(new NotFoundError('room not found'));

  let user = req.loggedUser?.id;

  if (req.body.user) {
    const existUser = await Users.findById(req.body.user);
    if (!existUser) return next(new NotFoundError('user not found'));
    user = existUser._id.toString();
  }

  // if shared reservation
  if (req.body.reservationType === ReservationType.shared) {
    const bookings = await RoomBooking.countDocuments({
      room: req.body.room,
      $or: [{ start: { $lt: endDate }, end: { $gt: startDate } }],
      reservationType: ReservationType.private,
    });

    if (bookings > 0)
      return next(
        new BadRequestError('cant reserve this room right now because private reservation'),
      );

    const setting = await Setting.findOne();

    if (setting?.sharedRoomPlan) {
      // reservation by plan
      if (differenceInHours > 4)
        return next(
          new BadRequestError(
            'reservation hours in shared room with plan reservation model must be less than or equal 4 hours',
          ),
        );
      if (!req.body.plan)
        return next(new BadRequestError('shared room reservation must be by plan right now'));

      // check plan in room
      const index = room.plans.findIndex((pl: any) => pl._id.toString() === req.body.plan);
      if (index === -1) return next(new BadRequestError('plan not found in this room '));

      const plan = await Plan.findById(req.body.plan);
      if (!plan) return next(new NotFoundError('plan not found'));

      // check plan type
      if (plan.type != PlanTypes.shared)
        return next(new BadRequestError('invalid plan type for this reservation type'));

      let reservationPrice = 0;

      // Enhanced reservation price calculation
      const sharedRates = [
        { maxHours: 1, rate: plan.shared.hourOne },
        { maxHours: 2, rate: plan.shared.hourTwo },
        { maxHours: 3, rate: plan.shared.hourThree },
        { maxHours: 4, rate: plan.shared.hourFour },
      ];

      for (const { maxHours, rate } of sharedRates) {
        if (differenceInHours <= maxHours) {
          reservationPrice = rate;
          break;
        }
      }

      if (room.seatsAvailable < req.body.seatsCount!)
        return next(new BadRequestError('no seats avaliable in this room right now'));

      const book = await RoomBooking.create({
        ...req.body,
        reservationPrice: reservationPrice * req.body.seatsCount!,
        user,
      });

      room.seatsAvailable = room.seatsAvailable - req.body.seatsCount!;
      await room.save();
      return res.status(201).json({ message: 'success', data: book });
    } else {
      if (!req.body.package)
        return next(new BadRequestError('shared room reservation must be by package right now'));

      const existPackage = await Package.findById(req.body.package);
      if (!existPackage) return next(new NotFoundError('package not found'));

      let reservationPrice = 0;
      const ifExtra = !!(differenceInHours - existPackage.duration);
      if (!ifExtra) reservationPrice = existPackage.price;
      else {
        const extraTime = differenceInHours - existPackage.duration;
        reservationPrice = extraTime * existPackage.extraPrice + existPackage.price;
      }

      // update seats avaliable inside room
      if (room.seatsAvailable < req.body.seatsCount!)
        return next(new BadRequestError('no seats avaliable in this room right now'));

      const book = await RoomBooking.create({
        ...req.body,
        reservationPrice: reservationPrice * req.body.seatsCount!,
        user,
      });

      room.seatsAvailable = room.seatsAvailable - req.body.seatsCount!;
      await room.save();
      return res.status(201).json({ message: 'success', data: book });
    }
  }

  // if private reservation
  if (req.body.reservationType === ReservationType.private) {
    const plan = await Plan.findById(req.body.plan);
    if (!plan) return next(new NotFoundError('plan not found'));

    if (plan.type != PlanTypes.private)
      return next(new BadRequestError('invalid plan type with private book'));

    // check of found book

    const bookings = await RoomBooking.countDocuments({
      room: req.body.room,
      $or: [{ start: { $lt: endDate }, end: { $gt: startDate } }],
    });

    if (bookings > 0)
      return next(
        new BadRequestError(
          'can not reserve this room private because have anther book in the same time',
        ),
      );

    const reservationPrice = differenceInHours * plan.private.price;

    const book = await RoomBooking.create({
      ...req.body,
      reservationPrice,
      user,
      seatsCount: 0,
    });

    return res.status(201).json({ message: 'success', data: book });
  }

  // if birthday reservation
  if (req.body.reservationType === ReservationType.birthDay) {
    const bookings = await RoomBooking.countDocuments({
      room: req.body.room,
      $or: [{ start: { $lt: endDate }, end: { $gt: startDate } }],
      reservationType: ReservationType.private,
    });

    if (bookings > 0)
      return next(
        new BadRequestError('cant reserve this room right now because private reservation'),
      );

    if (!room.birthDay) return next(new BadRequestError('this room not avaliable for birth day'));

    const plan = await Plan.findById(req.body.plan);

    if (!plan) return next(new NotFoundError('plan not found'));

    if (plan.type != PlanTypes.birthDay)
      return next(new BadRequestError('invalid plan type for birth day reservation'));

    if (room.seatsAvailable < req.body.seatsCount!)
      return next(new BadRequestError('no seats avaliable in this room right now'));

    const reservationPrice = differenceInHours * plan.birthDay.price;

    const book = await RoomBooking.create({
      ...req.body,
      reservationPrice: reservationPrice * req.body.seatsCount!,
      user,
    });

    room.seatsAvailable = room.seatsAvailable - req.body.seatsCount!;
    await room.save();

    return res.status(200).json({ message: 'success', data: book });
  }

  // invalid plan type

  return next(new BadRequestError('invalid reservation type'));
};
