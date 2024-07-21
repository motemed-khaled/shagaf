import express from 'express';

import * as handler from '../controllers/category';
import { isauthenticated } from '../guards/auth.guard';
import { checkRequiredFields } from '../middlewares/check-required-files.middleware';
import { globalPaginationMiddleware } from '../middlewares/global-pagination.middleware';
import { globalUploadMiddleware } from '../middlewares/global-upload.middleware';
import { FOLDERS } from '../types/folders';
import * as val from '../validation/category.val';

export const router = express.Router();

router
  .route('/')
  .post(
    isauthenticated,
    globalUploadMiddleware(FOLDERS.category, {
      maxSize: 50 * 1024 * 1024,
      fileTypes: ['image'],
    }).fields([{ name: 'cover', maxCount: 1 }]),
    val.createCategoryVal,
    checkRequiredFields({ fields: ['cover'] }),
    handler.createCategoryHandler,
  )
  .get(globalPaginationMiddleware, handler.getCategoriesHandler);

router
  .route('/:categoryId')
  .patch(
    isauthenticated,
    globalUploadMiddleware(FOLDERS.category, {
      maxSize: 50 * 1024 * 1024,
      fileTypes: ['image'],
    }).fields([{ name: 'cover', maxCount: 1 }]),
    val.updateCategoryVal,
    handler.updateCategoryHandler,
  )
  .get(val.getCategoryVal, handler.getCategoryHandler)
  .delete(isauthenticated, val.getCategoryVal, handler.deletCategoryHandler);
