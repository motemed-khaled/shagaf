import express from 'express';

import * as handlers from '../controllers/roomBooking';
import { isauthenticated } from '../guards/auth.guard';
import { globalPaginationMiddleware } from '../middlewares/global-pagination.middleware';
import * as val from '../validation/roomBooking.val';

export const router = express.Router();

router.route('/user').get(isauthenticated , val.getAll, globalPaginationMiddleware , handlers.getRoomBookingsPagination, handlers.getUserBookHandler);
router
  .route('/')
  .post(isauthenticated, val.validateRoomBooking, handlers.createNewBookHandler)
  .get(isauthenticated, val.getAll, globalPaginationMiddleware, handlers.getAllBookingHandler);

router
  .route('/:bookId')
  .patch(isauthenticated, val.addProductVal, handlers.addProductHandler)
  .get(isauthenticated, val.getOne, handlers.getBookHandler)
  .delete(isauthenticated, val.deleteProductVal, handlers.deleteProductHandler);
