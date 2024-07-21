import express from 'express';

import * as handler from '../controllers/packages';
import { isauthenticated } from '../guards/auth.guard';
import { globalPaginationMiddleware } from '../middlewares/global-pagination.middleware';
import * as val from '../validation/package.val';

export const router = express.Router();

router.use(isauthenticated);

router
  .route('/')
  .post(val.create, handler.createPackageHandler)
  .get(val.getAll, globalPaginationMiddleware, handler.getPackagesHandler);

router
  .route('/:packageId')
  .patch(val.update, handler.updatePackageHandler)
  .get(val.getOne, handler.getPackageHandler)
  .delete(val.getOne, handler.deletePackageHandler);
