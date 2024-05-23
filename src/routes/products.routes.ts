import express from 'express';

import * as handler from '../controllers/product';
import { isauthenticated } from '../guards/auth.guard';
import { checkRequiredFields } from '../middlewares/check-required-files.middleware';
import { globalPaginationMiddleware } from '../middlewares/global-pagination.middleware';
import { globalUploadMiddleware } from '../middlewares/global-upload.middleware';
import { FOLDERS } from '../types/folders';
import * as val from '../validation/product.val';



export const router = express.Router();

router.route('/')
  .post(isauthenticated , globalUploadMiddleware(FOLDERS.product, {
    maxSize: 50 * 1024 * 1024,
    fileTypes: ['image'],
  }).fields([{name:'cover' , maxCount:1}]) , val.createProductVal , checkRequiredFields({ fields: ['cover'] })  ,handler.createProductHandler)
  .get(val.getProductsVal,globalPaginationMiddleware , handler.getProductsHandler);

router.route('/:productId')
  .patch(isauthenticated ,globalUploadMiddleware(FOLDERS.product, {
    maxSize: 50 * 1024 * 1024,
    fileTypes: ['image'],
  }).fields([{name:'cover' , maxCount:1}]) , val.updateProductVal , handler.updateProductHandler )
  .get(val.getProductVal , handler.getProductHandler)
  .delete(val.getProductVal , handler.deleteProductHandler);