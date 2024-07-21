import 'express-async-errors';

import { MemberBooking } from '../../models/memberBooking.model';
import { Member } from '../../models/members.model';
import { Users } from '../../models/user.model';
import { BookMemberShipHandler } from '../../types/endpoints/member.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const bookMemberHandler: BookMemberShipHandler = async (req, res, next) => {
  let user;

  const member = await Member.findById(req.body.member);
  if (!member) return next(new NotFoundError('member plan not found'));
  if (req.body.user) user = await Users.findById(req.body.user);

  let totalPrice = member.price;

  if (req.body.stuffDiscount) totalPrice = totalPrice - req.body.stuffDiscount;

  if (req.body.pointDiscount) {
    if (user) {
      totalPrice = totalPrice - (user.point / 1000) * 10;
      req.body.pointDiscount = (user!.point / 1000) * 10;
    } else {
      user = await Users.findById(req.loggedUser?.id);
      totalPrice = totalPrice - (user!.point / 1000) * 10;
      req.body.pointDiscount = (user!.point / 1000) * 10;
    }
  }

  req.body.end = calculateEndDate(req.body.start.toString(), member.duration, member.durationType);

  const book = await MemberBooking.create({
    ...req.body,
    user: user ? req.body.user : req.loggedUser?.id,
    totalPrice,
  });

  res.status(201).json({ message: 'success', data: book });
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

const addYears = (date: Date, years: number): Date => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
};
type DurationType = 'Day' | 'Month' | 'Year';

const calculateEndDate = (
  startDate: string,
  duration: number,
  durationType: DurationType,
): Date => {
  let endDate = new Date(startDate);

  switch (durationType) {
    case 'Day':
      endDate = addDays(endDate, duration);
      break;
    case 'Month':
      endDate = addMonths(endDate, duration);
      break;
    case 'Year':
      endDate = addYears(endDate, duration);
      break;
    default:
      throw new Error('Invalid duration type');
  }

  return endDate;
};
