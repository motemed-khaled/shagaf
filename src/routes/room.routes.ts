import express from 'express';

import * as handlers from '../controllers/rooms';
import { isauthenticated } from '../guards/auth.guard';
import { checkRequiredFields } from '../middlewares/check-required-files.middleware';
import { globalPaginationMiddleware } from '../middlewares/global-pagination.middleware';
import { globalUploadMiddleware } from '../middlewares/global-upload.middleware';
import { FOLDERS } from '../types/folders';
import * as val from '../validation/room.val';

export const router = express.Router();

router
  .route('/')
  .post(
    isauthenticated,
    globalUploadMiddleware(FOLDERS.room, {
      maxSize: 50 * 1024 * 1024,
      fileTypes: ['image'],
    }).fields([
      { name: 'cover', maxCount: 1 },
      { name: 'attachments', maxCount: 10 },
    ]),
    val.createRoom,
    checkRequiredFields({ fields: ['cover', 'attachments'] }),
    handlers.createRoomHandler,
  )
  .get(
    val.getAll,
    globalPaginationMiddleware,
    handlers.getRoomsPagination,
    handlers.getRoomsHandler,
  );

router
  .route('/:roomId')
  .patch(
    isauthenticated,
    globalUploadMiddleware(FOLDERS.room, {
      maxSize: 50 * 1024 * 1024,
      fileTypes: ['image'],
    }).fields([
      { name: 'cover', maxCount: 1 },
      { name: 'attachments', maxCount: 10 },
    ]),
    val.updateRoom,
    handlers.updateRoomHandler,
  )
  .get(val.getOne, handlers.getRoomHandler)
  .delete(isauthenticated, val.getOne, handlers.deleteRoomHandler)
  .post(
    isauthenticated,
    globalUploadMiddleware(FOLDERS.room, {
      maxSize: 50 * 1024 * 1024,
      fileTypes: ['image'],
    }).fields([{ name: 'image', maxCount: 1 }]),
    val.addAmenitiesVal,
    checkRequiredFields({ fields: ['image'] }),
    handlers.addAmenitiesHandler,
  );

router
  .route('/:roomId/amenities/:amenitiesId')
  .patch(
    isauthenticated,
    globalUploadMiddleware(FOLDERS.room, {
      maxSize: 50 * 1024 * 1024,
      fileTypes: ['image'],
    }).fields([{ name: 'image', maxCount: 1 }]),
    val.updateAmenitiesVal,
    checkRequiredFields({ fields: ['image'] }),
    handlers.updateAmenitiesHandler,
  )
  .delete(isauthenticated, val.deleteAmenitiesVal, handlers.deleteAmenitiesHandler);
