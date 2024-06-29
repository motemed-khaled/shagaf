import express from 'express';

import * as handler from '../controllers/rooms';
import { isauthenticated } from '../guards/auth.guard';
import { checkRequiredFields } from '../middlewares/check-required-files.middleware';
import { globalPaginationMiddleware } from '../middlewares/global-pagination.middleware';
import { globalUploadMiddleware } from '../middlewares/global-upload.middleware';
import { FOLDERS } from '../types/folders';
import * as val from '../validation/room.val';



export const router = express.Router();


router.route('/newBook').post( val.openBookVal , handler.openNewBookHandler);
router.route('/newBook/:bookId').patch( val.closeBookVal , handler.closeBookHandler);
router.route('/book/member').post(isauthenticated , val.bookMemberRoomVal , handler.bookRoomForMemberHandler);

router.route('/')
  .post(isauthenticated , globalUploadMiddleware(FOLDERS.room, {
    maxSize: 50 * 1024 * 1024,
    fileTypes: ['image'],
  }).fields([{name:'cover' , maxCount:1} , {name:'attachments' , maxCount:10}]) , val.createRoomVal,checkRequiredFields({ fields: ['cover', 'attachments'] }) , handler.createRoomHandler )
  .get(val.getRoomsVal , globalPaginationMiddleware , handler.getRoomsPagination , handler.getRoomsHandler);


router.get('/book/user' , isauthenticated , handler.getUserBookingHandler);

router.route('/book')
  .post( isauthenticated , val.bookRoomVal , handler.bookRoomHandler)
  .get(isauthenticated , val.getAllBookingVal , globalPaginationMiddleware , handler.getRoomBookingsPagination , handler.getAllBookingHandler);

router.route('/book/:bookId')
  .patch(isauthenticated , val.updateBookVal , handler.updateRoomBookHandler)
  .get(isauthenticated , val.getBookVal , handler.getBookHandler);

router.route('/book/:bookId/stuff')
  .post(isauthenticated , val.addExtraTimeVal , handler.addExtraTimeHandler)
  .put(isauthenticated , val.addCoffeeVal , handler.addCoffeeHandler)
  .patch(isauthenticated , val.updateCoffeeVal , handler.updateCoffeeToBokkingHandler);

  
router.route('/book/:bookId/payment').patch(isauthenticated , val.updatePaymentVal, handler.updatePaymentHandler);
  
router.route('/:roomId')
  .patch(
    isauthenticated,
    globalUploadMiddleware(FOLDERS.room, {
      maxSize: 50 * 1024 * 1024,
      fileTypes: ['image'],
    }).fields([{name:'cover' , maxCount:1}]) , val.UpdateRoomVal , handler.updateRoomHandler)
  .get(isauthenticated , val.getRoomVal , handler.getRoomHandler)
  .delete(isauthenticated , val.deleteRoomVal , handler.deleteRoomHandler);

router.route('/:roomId/attachment')
  .post(isauthenticated ,     globalUploadMiddleware(FOLDERS.room, {
    maxSize: 50 * 1024 * 1024,
    fileTypes: ['image'],
  }).fields([{name:'attachments' , maxCount:10}]) , val.addAttachmentVal, checkRequiredFields({fields:['attachments']})  , handler.addAattachmentHandler)
  .patch(isauthenticated , globalUploadMiddleware(FOLDERS.room, {
    maxSize: 50 * 1024 * 1024,
    fileTypes: ['image'],
  }).fields([{name:'attachments' , maxCount:1}]), val.updateAttachmentVal,checkRequiredFields({fields:['attachments']})  , handler.updateAttachmentHandler )
  .delete(isauthenticated , val.deleteAttachmentVal , handler.deleteAttachmentHandler);

router.route('/:roomId/amenities')
  .post(isauthenticated,globalUploadMiddleware(FOLDERS.room, {
    maxSize: 50 * 1024 * 1024,
    fileTypes: ['image'],
  }).fields([{name:'attachments' , maxCount:1}]) , val.addAmenitiesVal,checkRequiredFields({fields:['attachments']})  , handler.addAmenitiesHandler )
  .patch(isauthenticated ,globalUploadMiddleware(FOLDERS.room, {
    maxSize: 50 * 1024 * 1024,
    fileTypes: ['image'],
  }).fields([{name:'attachments' , maxCount:1}]) , val.updateAmenitiesVal , handler.updateAmenitiesHandler )
  .delete(isauthenticated , val.deleteAmenitiesVal , handler.deleteAmenitiesHandler);