import { body, param } from 'express-validator';

import { validationMiddleware } from '../middlewares/global-validator.middleware';

export const update = [
  param('settingId').isMongoId().bail(),
  body('sharedRoomPlan').isBoolean().toBoolean().bail(),
  validationMiddleware,
];
