import express from 'express';

import * as handler from '../controllers/events';
import { isauthenticated } from '../guards/auth.guard';
import { checkRequiredFields } from '../middlewares/check-required-files.middleware';
import { globalPaginationMiddleware } from '../middlewares/global-pagination.middleware';
import { globalUploadMiddleware } from '../middlewares/global-upload.middleware';
import { FOLDERS } from '../types/folders';
import * as val from '../validation/event.val';




export const router = express.Router();


router.route('/')
  .post(isauthenticated, globalUploadMiddleware(FOLDERS.event, {
    maxSize: 50 * 1024 * 1024,
    fileTypes: ['image'],
  }).fields([{name:'cover' , maxCount:1}]) , val.createEventVal , checkRequiredFields({ fields: ['cover'] }) , handler.createEventHandler )
  .get(globalPaginationMiddleware,handler.getEventsHandler);

router.route('/book' )
  .post(isauthenticated ,val.eventBookVal , handler.bookEventHandler )
  .get(isauthenticated  , val.getEventsBookVal , globalPaginationMiddleware  , handler.getEventsBookingHandler)
  .patch(isauthenticated , val.updateBookVal , handler.updateEventBookHandler);

router.route('/book/user').get(isauthenticated , handler.getUserBookEventsHandler);
router.route('/book/:bookId')
  .get(isauthenticated ,val.getEventBookVal , handler.getEventBookHandler)
  .patch(isauthenticated , val.getEventBookVal , handler.updateEventBookPaymentHandler);

router.route('/:eventId/detail')
  .patch(isauthenticated , val.updateDetailVal , handler.updateDetailHandler)
  .delete(isauthenticated , val.deleteDetailVal , handler.deleteDetailHandler);


router.route('/:eventId')
  .patch(isauthenticated , globalUploadMiddleware(FOLDERS.event, {
    maxSize: 50 * 1024 * 1024,
    fileTypes: ['image'],
  }).fields([{name:'cover' , maxCount:1}]) , val.updateEventVal , handler.updateEventHandler )
  .get(val.getEventVal  , handler.getEventHandler)
  .delete( isauthenticated , val.deleteEventVal , handler.deleteEventHandler);
