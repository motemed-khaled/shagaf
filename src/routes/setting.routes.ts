import express from 'express';

import * as handlers from '../controllers/settings';
import { isauthenticated } from '../guards/auth.guard';
import * as val from '../validation/setting.val';

export const router = express.Router();

router.route('/')
  .get(handlers.getSettingHandler);

router.route('/:settingId')
  .patch( isauthenticated , val.update, handlers.updateSettingHandler);