import express from 'express';

import * as handler from '../controllers/member';
import { isauthenticated } from '../guards/auth.guard';
import { globalPaginationMiddleware } from '../middlewares/global-pagination.middleware';
import * as val from '../validation/member.val';

export const router = express.Router();

router.route('/user').post(isauthenticated, val.updateUserVal, handler.UpdateUserHandler);

router
  .route('/')
  .post(isauthenticated, val.createMemberVal, handler.createMemberHandler)
  .get(globalPaginationMiddleware, val.getMembersVal, handler.getMembersHandler);

router.get(
  '/user/book',
  isauthenticated,
  val.getAllBookingVal,
  globalPaginationMiddleware,
  handler.getUserBookingHandler,
);
router
  .route('/book')
  .post(isauthenticated, val.memberBookVal, handler.bookMemberHandler)
  .get(
    isauthenticated,
    val.getAllBookingVal,
    globalPaginationMiddleware,
    handler.getMemberBookingsPagination,
    handler.getAllBookingHandler,
  );

router
  .route('/book/:bookId')
  .patch(isauthenticated, val.updateBookVal, handler.updateBookHandler)
  .get(isauthenticated, val.getBookVal, handler.getBookHandler)
  .put(isauthenticated, val.getBookVal, handler.updateBookPaymentHandler);
router
  .route('/:memberId/detail')
  .patch(isauthenticated, val.updateMemberDetailVal, handler.updateMemberDetailHandler)
  .delete(isauthenticated, val.deleteMemberDetailVal, handler.deleteMemberDetailHandler);

router
  .route('/:memberId')
  .patch(isauthenticated, val.updateMemberVal, handler.updateMemberHandler)
  .get(val.getMemberVal, handler.getMemberHandler)
  .delete(isauthenticated, val.deleteMemberVal, handler.deleteMemberHandler);
