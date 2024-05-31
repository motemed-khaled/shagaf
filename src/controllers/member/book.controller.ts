import 'express-async-errors';

import { MemberBooking } from '../../models/memberBooking.model';
import { Member } from '../../models/members.model';
import { Users } from '../../models/user.model';
import { BookMemberShipHandler } from '../../types/endpoints/member.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';


export const bookMemberHandler:BookMemberShipHandler = async (req,res,next)=>{
  let user;

  const member = await Member.findById(req.body.member);
  if (!member)
    return next(new NotFoundError('member plan not found'));
  if (req.body.user) 
    user = await Users.findById(req.body.user);


  let totalPrice = member.price;

  if (req.body.stuffDiscount)
    totalPrice = totalPrice - req.body.stuffDiscount;

  if (req.body.pointDiscount){
    if (user) {
      totalPrice = totalPrice - (user.point / 1000) * 10;
      req.body.pointDiscount = (user!.point / 1000)*10;
    }
    else {
      user = await Users.findById(req.loggedUser?.id);
      totalPrice = totalPrice - (user!.point / 1000) * 10;
      req.body.pointDiscount = (user!.point / 1000)*10;
    }
    
  }

  const book = await MemberBooking.create({
    ...req.body,
    user:user?req.body.user:req.loggedUser?.id,
    totalPrice,
  });

  res.status(201).json({message:'success' , data:book});

};