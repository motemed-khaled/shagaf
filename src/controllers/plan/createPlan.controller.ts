import 'express-async-errors';

import { Plan } from '../../models/plan.model';
import { CreatePlanHandler } from '../../types/endpoints/plan.endpoint';
import { FOLDERS } from '../../types/folders';

export const createPlanHandler: CreatePlanHandler = async (req, res) => {
  const icon = <Express.Multer.File[]>(req.files as any).icon;

  if (icon.length) req.body.icon = `/media/${FOLDERS.plan}/${icon[0].filename}`;

  const plan = await Plan.create(req.body);

  res.status(201).json({ message: 'success', data: plan });
};
