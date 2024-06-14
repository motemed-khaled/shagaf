import express from 'express';

import * as handler from '../controllers/users';
import { isauthenticated } from '../guards/auth.guard';
import { globalPaginationMiddleware } from '../middlewares/global-pagination.middleware';
import * as val from '../validation/user.val';

export const router = express.Router();



router.get('/' , isauthenticated , val.getUsersVal , globalPaginationMiddleware , handler.getUsersPagination , handler.getUsersHandler);
router.post('/signup' , val.signUpVal ,handler.sginUpHandler);
router.post('/signin' , val.signInVal , handler.siginHandler);
router.route('/verify').post(val.verifyUserVal , handler.verifyUserHandler);
router.post('/resend-code'  , val.resendCodeVal, handler.resendVerificationCodeHandler);
router.route('/reset-password')
  .get(val.askForgetPasswordVal , handler.askForegetPasswordHandler)
  .patch(val.updateForgetPasswordVal , handler.updatePasswordHandler);
  
router.use(isauthenticated);
router.route('/change-password').patch(val.changePasswordVal , handler.changePasswordHandler);
  
router.route('/update-email')
  .get(handler.askUpdateEmailHandler)
  .patch(val.updateEmailVal , handler.updateEmailHandler);

router.route('/profile')
  .patch(val.updateLoggedUserVal , handler.updateLoggedUserHandler)
  .get(handler.getLoggedUserHandler);
  
router.route('/admin').post(isauthenticated , val.createUserVal , handler.createUserHandler);
router.route('/admin/:userId').patch(isauthenticated , val.updateUserVal , handler.updateUserHandler)
  .delete(isauthenticated , val.deleteUserVal , handler.deleteUserHandler);

router.get('/:userId' , isauthenticated  , val.deleteUserVal, handler.getUserPointDiscountHandler);