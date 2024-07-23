import 'express-async-errors';

import { Express } from 'express';

import { Plan } from '../../models/plan.model';
import { UpdatePlanHandler } from '../../types/endpoints/plan.endpoint';
import { FOLDERS } from '../../types/folders';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';

export const updatePlanHandler: UpdatePlanHandler = async (req, res, next) => {
  const plan = await Plan.findById(req.params.planId);
  if (!plan) return next(new NotFoundError('plan not found'));

  if (req.body.type && plan.type != req.body.type)
    return next(new BadRequestError('invalid plan type'));

  const icon = <Express.Multer.File[] | undefined>(req.files as any).icon;
  if (icon?.length) {
    req.body.icon = `/media/${FOLDERS.plan}/${icon[0].filename}`;
    Files.removeFiles(plan.icon ? plan.icon : undefined);
  }

  const updatedPlan = await Plan.findByIdAndUpdate(req.params.planId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ message: 'success', data: updatedPlan! });
};
