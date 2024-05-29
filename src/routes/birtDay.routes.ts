import express from 'express';


import * as handler from '../controllers/birthday';
import { isauthenticated } from '../guards/auth.guard';
import { checkRequiredFields } from '../middlewares/check-required-files.middleware';
import { globalPaginationMiddleware } from '../middlewares/global-pagination.middleware';
import { globalUploadMiddleware } from '../middlewares/global-upload.middleware';
import { FOLDERS } from '../types/folders';
import * as val from '../validation/birthDay.val';



export const router = express.Router();

router.route('/')
  .post(isauthenticated, globalUploadMiddleware(FOLDERS.birthday, {
    maxSize: 50 * 1024 * 1024,
    fileTypes: ['image'],
  }).fields([{name:'cover' , maxCount:1}]) , val.createDayVal , checkRequiredFields({ fields: ['cover'] }) , handler.createDayHandler)
  .get(val.getDaysVal , globalPaginationMiddleware , handler.getDaysHandler);


router.route('/book')
  .post( isauthenticated, val.dayBookVal , handler.dayBookHandler)
  .get(isauthenticated , val.getAllBookingVal , globalPaginationMiddleware , handler.getAllBookingHandler);


router.get('/book/user' , isauthenticated , handler.getUserBookingHandler);

router.route('/book/:bookId')
  .patch(isauthenticated , val.UpdateDayBookVal , handler.updateBookHandler)
  .get(isauthenticated , val.getBookVal , handler.getBookHandler);

router.route('/:dayId')
  .patch(isauthenticated ,globalUploadMiddleware(FOLDERS.birthday, {
    maxSize: 50 * 1024 * 1024,
    fileTypes: ['image'],
  }).fields([{name:'cover' , maxCount:1}]) , val.updateDayVal , handler.updateDayHandler )
  .get(val.getDayVal , handler.getDayHandler)
  .delete( isauthenticated , val.deleteDayVal , handler.deleteDayHandler);