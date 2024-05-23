import 'express-async-errors';

import { Users, VerificationReason } from '../../models/user.model';
import { SignUpHandler } from '../../types/endpoints/user.endpoints';
import { hashVerificationCode } from '../../utils/crypto';
import { ServerError } from '../../utils/errors/server-error';
import { generateRandom6Digit } from '../../utils/gitRandom6Dugut';
import { sendEmail } from '../../utils/sendMail';


export const sginUpHandler:SignUpHandler = async (req,res,next)=>{
  const verificationCode:string = generateRandom6Digit();
  const user = await Users.create({
    ...req.body,
    verificationCode:{
      code: await hashVerificationCode(verificationCode),
      expireAt: new Date(Date.now() + 5 * 60 * 1000),
      reason: VerificationReason.signup
    },
    isVerified:false
  });

  try {
    await sendEmail({email:user.email , subject:'verification code' , message:verificationCode});
  } catch (error) {
    user.verificationCode=undefined;
    await user.save();
    return next(new ServerError('we have an error for sending mail'));
  }

  await user.save();
  res.status(201).json(<any>{message:'success' , verificationCode});
};
