import express from 'express';

import * as handler from '../controllers/roomLogier';
import { isauthenticated } from '../guards/auth.guard';
import { globalPaginationMiddleware } from '../middlewares/global-pagination.middleware';
import * as val from '../validation/logier.val';

export const router = express.Router();

router
  .route('/:bookId')
  .get(
    isauthenticated,
    val.validateLogierVal,
    globalPaginationMiddleware,
    handler.getAuditLogsPagination,
    handler.getLogierForBookingHandler,
  );
