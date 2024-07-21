import express from 'express';

import * as handlers from '../controllers/plan';
import { isauthenticated } from '../guards/auth.guard';
import { checkRequiredFields } from '../middlewares/check-required-files.middleware';
import { globalPaginationMiddleware } from '../middlewares/global-pagination.middleware';
import { globalUploadMiddleware } from '../middlewares/global-upload.middleware';
import { FOLDERS } from '../types/folders';
import * as val from '../validation/plans.val';




export const router = express.Router();



router.route('/')
  .post(isauthenticated, globalUploadMiddleware(FOLDERS.plan, {
    maxSize: 50 * 1024 * 1024,
    fileTypes: ['image'],
  }).fields([{ name: 'icon', maxCount: 1 }]),
  val.createPlanVal,
  checkRequiredFields({ fields: ['icon'] }), val.createPlanVal , handlers.createPlanHandler)
  .get(val.getAll , globalPaginationMiddleware , handlers.getPlansHandler);

router.route('/:planId')
  .patch(isauthenticated , globalUploadMiddleware(FOLDERS.plan, {
    maxSize: 50 * 1024 * 1024,
    fileTypes: ['image'],
  }).fields([{ name: 'icon', maxCount: 1 }]), val.updatePlanVal , handlers.updatePlanHandler)
  .get(val.getPlan , handlers.getPlanHandler);