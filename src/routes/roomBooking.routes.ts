import express from 'express';

import * as handlers from '../controllers/roomBooking';
import { isauthenticated } from '../guards/auth.guard';
import { globalPaginationMiddleware } from '../middlewares/global-pagination.middleware';
import * as val from '../validation/roomBooking.val';

export const router = express.Router();

router
  .route('/user')
  .get(
    isauthenticated,
    val.getAll,
    globalPaginationMiddleware,
    handlers.getRoomBookingsPagination,
    handlers.getUserBookHandler,
  );

router.route('/open-book').post(isauthenticated , val.openBookVal , handlers.openNewBookHandler);
router.route('/open-book/:bookId').post(isauthenticated , val.closeBookVal , handlers.closeBookHandler);

router
  .route('/')
  .post(isauthenticated, val.validateRoomBooking, handlers.createNewBookHandler)
  .get(isauthenticated, val.getAll, globalPaginationMiddleware, handlers.getAllBookingHandler);

router
  .route('/:bookId')
  .post(isauthenticated, val.addProductVal, handlers.addProductHandler)
  .get(isauthenticated, val.getOne, handlers.getBookHandler)
  .delete(isauthenticated, val.deleteProductVal, handlers.deleteProductHandler)
  .patch(isauthenticated , val.updateBookVal , handlers.updateBookHandler);
