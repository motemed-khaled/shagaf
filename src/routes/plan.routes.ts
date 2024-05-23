import express from 'express';


import * as handler from '../controllers/plan';
import { isauthenticated } from '../guards/auth.guard';
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
    }).fields([{name:'icon' , maxCount:1}]) ,val.createPlanVal , checkRequiredFields({ fields: ['icon'] })  , handler.cretaePlanHandler)
  .get(val.getPlansHandler , globalPaginationMiddleware , handler.getPlansHandler);

router.route('/:planId')
  .get(val.getPlanVal , handler.getPlanHandler)
  .patch( isauthenticated,globalUploadMiddleware(FOLDERS.plan, {
    maxSize: 50 * 1024 * 1024,
    fileTypes: ['image'],
  }).fields([{name:'icon' , maxCount:1}]),val.updatePlanVal , handler.updatePlanHandler)
  .delete(isauthenticated ,val.deletePlanVal , handler.deletePlanHandler);