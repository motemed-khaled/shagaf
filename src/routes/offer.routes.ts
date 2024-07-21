import express from 'express';

import * as handler from '../controllers/offer';
import { isauthenticated } from '../guards/auth.guard';
import { checkRequiredFields } from '../middlewares/check-required-files.middleware';
import { globalPaginationMiddleware } from '../middlewares/global-pagination.middleware';
import { globalUploadMiddleware } from '../middlewares/global-upload.middleware';
import { FOLDERS } from '../types/folders';
import * as val from '../validation/offer.val';

export const router = express.Router();

router.get(
  '/users',
  isauthenticated,
  val.getUsersOfferVal,
  globalPaginationMiddleware,
  handler.getLoggedUserOffersHandler,
);

router
  .route('/')
  .post(
    isauthenticated,
    globalUploadMiddleware(FOLDERS.offer, {
      maxSize: 50 * 1024 * 1024,
      fileTypes: ['image'],
    }).fields([{ name: 'cover', maxCount: 1 }]),
    val.createOfferVal,
    checkRequiredFields({ fields: ['cover'] }),
    handler.createOfferHandler,
  )
  .get(
    val.getOffersVal,
    globalPaginationMiddleware,
    handler.getOffersPagination,
    handler.getOffersHandler,
  );

router
  .route('/:offerId')
  .patch(
    isauthenticated,
    globalUploadMiddleware(FOLDERS.offer, {
      maxSize: 50 * 1024 * 1024,
      fileTypes: ['image'],
    }).fields([{ name: 'cover', maxCount: 1 }]),
    val.UpdateOfferVal,
    handler.updateOfferHandler,
  )
  .get(val.getOfferVal, handler.getOfferHandler)
  .delete(isauthenticated, val.deleteOfferVal, handler.deleteOfferHandler);
