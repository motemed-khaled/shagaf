import express from 'express';


import * as handler from '../controllers/plan';
import { checkRequiredFields } from '../middlewares/check-required-files.middleware';
import { globalPaginationMiddleware } from '../middlewares/global-pagination.middleware';
import { globalUploadMiddleware } from '../middlewares/global-upload.middleware';
import { FOLDERS } from '../types/folders';
import * as val from '../validation/plan.val';


export const router = express.Router();

router.route('/')
  .post(  
    globalUploadMiddleware(FOLDERS.plan, {
      maxSize: 50 * 1024 * 1024,
      fileTypes: ['image'],
    }).array('icon', 1),
    checkRequiredFields({array:'icon'}),val.createPlanVal , handler.cretaePlanHandler)
  .get(val.getPlansHandler , globalPaginationMiddleware , handler.getPlansHandler);

router.route('/:planId')
  .get(val.getPlanVal , handler.getPlanHandler)
  .patch(    globalUploadMiddleware(FOLDERS.plan, {
    maxSize: 50 * 1024 * 1024,
    fileTypes: ['image'],
  }).array('icon', 1),val.updatePlanVal , handler.updatePlanHandler)
  .delete(val.deletePlanVal , handler.deletePlanHandler);