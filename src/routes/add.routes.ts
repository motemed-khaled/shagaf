import express from 'express';

import * as handler from '../controllers/adds';
import { isauthenticated } from '../guards/auth.guard';
import { checkRequiredFields } from '../middlewares/check-required-files.middleware';
import { globalUploadMiddleware } from '../middlewares/global-upload.middleware';
import { FOLDERS } from '../types/folders';
import * as val from '../validation/add.val';

export const router = express.Router();

router
  .route('/')
  .post(
    isauthenticated,
    globalUploadMiddleware(FOLDERS.adds, {
      maxSize: 50 * 1024 * 1024,
      fileTypes: ['image'],
    }).fields([{ name: 'cover', maxCount: 1 }]),
    checkRequiredFields({ fields: ['cover'] }),
    handler.createAddHandler,
  )
  .get(handler.getAddsHandler);

router
  .route('/:addId')
  .patch(
    isauthenticated,
    globalUploadMiddleware(FOLDERS.adds, {
      maxSize: 50 * 1024 * 1024,
      fileTypes: ['image'],
    }).fields([{ name: 'cover', maxCount: 1 }]),
    val.getAddVal,
    checkRequiredFields({ fields: ['cover'] }),
    handler.updateAddHandler,
  )
  .get(val.getAddVal, handler.getAddHandler)
  .delete(val.deleteAddVal, handler.deleteAddHandler);
