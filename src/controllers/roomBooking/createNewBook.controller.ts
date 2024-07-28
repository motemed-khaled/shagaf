import { RequestHandler } from 'express';

import 'express-async-errors';
import { Plan, PlanTypes } from '../../models/plan.model';
import { IRoomBooking, ReservationType } from '../../models/roomBooking.model';
import { Room } from '../../models/rooms.model';
import { Setting } from '../../models/settings.models';
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

  const startDate: Date = new Date('2024-07-28T08:00:00'); 
  const endDate: Date = new Date('2024-07-28T12:00:00'); 
    
  const differenceInMilliseconds: number = endDate.getTime() - startDate.getTime();
  const differenceInHours: number = differenceInMilliseconds / (1000 * 60 * 60);

  if (differenceInHours > 24) 
    return next(new BadRequestError('reservation hours must be less than 24 hour'));

  const room = await Room.findById(req.body.room);
  if (!room) return next(new NotFoundError('room not found'));

  if (req.body.reservationType === ReservationType.shared) {
    const setting = await Setting.findOne();

    if (setting?.sharedRoomPlan) {
      // reservation by plan
      if (differenceInHours > 4) 
        return next(new BadRequestError('reservation hours in shared room with plan reservation model must be less than or equal 4 hours'));
      if (!req.body.plan)
        return next(new BadRequestError('shared room reservation must be by plan right now'));
      
      // check plan in room
      const index = room.plans.findIndex((pl:any) => pl._id.toString() === req.body.plan);
      if (index === -1) 
        return next(new BadRequestError('plan not found in this room '));

      const plan = await Plan.findById(req.body.plan);
      if (!plan) return next(new NotFoundError('plan not found'));
      
      // check plan type
      if (plan.type != PlanTypes.shared)
        return next(new BadRequestError('invalid plan type for this reservation type'));

      // calc reservation price
    
      

    }else{
      if (!req.body.package) 
        return next(new BadRequestError('shared room reservation must be by package right now'));
    }





  }
};
