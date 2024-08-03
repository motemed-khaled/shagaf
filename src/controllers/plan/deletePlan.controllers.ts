import { RequestHandler } from 'express';

import 'express-async-errors';
import { Plan, PlanTypes } from '../../models/plan.model';
import { successResponse } from '../../types/response';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const deletePlanHandler: RequestHandler<
  { planId: string },
  successResponse,
  unknown,
  unknown
> = async (req, res, next) => {
  const plan = await Plan.findOneAndDelete({ _id: req.params.planId, type: PlanTypes.birthDay });

  if (!plan) return next(new NotFoundError('plan not found'));

  res.status(204).json({ message: 'success' });
};
