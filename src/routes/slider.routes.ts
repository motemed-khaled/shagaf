import express from 'express';

import * as handler from '../controllers/sliders';
import { isauthenticated } from '../guards/auth.guard';
import { checkRequiredFields } from '../middlewares/check-required-files.middleware';
import { globalUploadMiddleware } from '../middlewares/global-upload.middleware';
import { FOLDERS } from '../types/folders';
import * as val from '../validation/slider.val';


export const router = express.Router();



router.route('/')
  .post(isauthenticated, globalUploadMiddleware(FOLDERS.slider, {
    maxSize: 50 * 1024 * 1024,
    fileTypes: ['image'],
  }).fields([{name:'cover' , maxCount:1}]) , val.createSliderVal,checkRequiredFields({fields:['cover']}) , handler.createSliderHandler)
  .get(handler.getSlidersHandler);

router.route('/:sliderId')
  .patch(isauthenticated, globalUploadMiddleware(FOLDERS.slider, {
    maxSize: 50 * 1024 * 1024,
    fileTypes: ['image'],
  }).fields([{name:'cover' , maxCount:1}]),val.updateSliderVal , handler.updateSliderHandler)
  .get(val.getSliderVal , handler.getSliderHandler)
  .delete(isauthenticated , val.deleteSliderVal , handler.deleteSliderHandler);