import 'express-async-errors';

import { Product } from '../../models/product.model';
import { RoomBooking } from '../../models/roomBooking.model';
import { AddCoffeeToBookingHandler } from '../../types/endpoints/room.endpoint';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';


export const addCoffeeHandler:AddCoffeeToBookingHandler = async (req,res,next)=>{
  const book = await RoomBooking.findOne({_id:req.params.bookId , coffeePaid:false });

  if (!book) 
    return next(new NotFoundError('book not found'));

  const coffeeCount = await Product.countDocuments({_id:req.body.coffee.map(el => el.product)});

  if (coffeeCount !=req.body.coffee.length) 
    return next(new BadRequestError('invalid products'));

  let totalCount = 0;

  for (let i = 0; i < req.body.coffee.length; i++) {
    const product = await Product.findById(req.body.coffee[i].product);
    totalCount += product!.price * req.body.coffee[i].count;  
  }

  const updatedBook  = await RoomBooking.findByIdAndUpdate(req.params.bookId , {coffee:req.body.coffee , coffeePrice:totalCount , totalPrice:totalCount+book.totalPrice} , {new:true}).populate([
    {path:'user' , select:'email username'},
    {path:'room'},
    {path:'plan'},
    {path:'coffee.product'}
  ]);


  res.status(200).json({message:'success' , data:updatedBook!});

};