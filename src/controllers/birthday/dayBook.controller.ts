import 'express-async-errors';

import { BirthDay } from '../../models/birthDay.model';
import { DayBook } from '../../models/dayBook.model';
import { DayBookHandler } from '../../types/endpoints/birthday.endpoint';
import { BadRequestError } from '../../utils/errors/bad-request-error';




export const dayBookHandler:DayBookHandler = async (req,res,next)=>{
    
  const products = await BirthDay.countDocuments({_id:req.body.products.map(el=>el.product)});
  if (products != req.body.products.length) 
    return next(new BadRequestError('invalid products'));
  let  totalPrice:number = 0;
  
  for (let i = 0; i < req.body.products.length; i++) {
    const product = await BirthDay.findById(req.body.products[i].product);
    totalPrice += product!.price * req.body.products[i].count;
  }

  req.body.totalPrice = totalPrice;

  const book  = await DayBook.create({...req.body , user:req.loggedUser?.id});

  res.status(201).json({message:'success' , data:book});
};