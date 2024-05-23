import express from 'express';

import * as handler from '../controllers/member';
import { isauthenticated } from '../guards/auth.guard';
import { globalPaginationMiddleware } from '../middlewares/global-pagination.middleware';
import * as val from '../validation/member.val';



export const router = express.Router();


router.route('/')
  .post(isauthenticated , val.createMemberVal , handler.createMemberHandler)
  .get(globalPaginationMiddleware , val.getMembersVal , handler.getMembersHandler);

router.route('/:memberId/detail')
  .patch(isauthenticated , val.updateMemberDetailVal , handler.updateMemberDetailHandler)
  .delete(isauthenticated , val.deleteMemberDetailVal , handler.deleteMemberDetailHandler);

router.route('/:memberId')
  .patch(isauthenticated , val.updateMemberVal , handler.updateMemberHandler)
  .get(val.getMemberVal , handler.getMemberHandler)
  .delete(isauthenticated , val.deleteMemberVal , handler.deleteMemberHandler);