import 'express-async-errors';

import { BirthDay } from '../../models/birthDay.model';
import { DayBook } from '../../models/dayBook.model';
import { Users } from '../../models/user.model';
import { DayBookHandler } from '../../types/endpoints/birthday.endpoint';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';


export const dayBookHandler:DayBookHandler = async (req,res,next)=>{

  let user;
  if (req.body.user) {
    user = await Users.findById(req.body.user);
    if (!user) 
      return next(new NotFoundError(`user ${req.body.user} not found`));
  }
    
  const products = await BirthDay.countDocuments({_id:req.body.products.map(el=>el.product)});
  
  if (products != req.body.products.length) 
    return next(new BadRequestError('invalid products'));
  let  totalPrice:number = 0;
  
  for (let i = 0; i < req.body.products.length; i++) {
    const product = await BirthDay.findById(req.body.products[i].product);
    totalPrice += product!.price * req.body.products[i].count;
  }

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
  
  req.body.totalPrice = totalPrice;


  const book  = await DayBook.create({...req.body , user: user?user._id:req.loggedUser?.id});

  res.status(201).json({message:'success' , data:book});
};