import 'express-async-errors';

import { Product } from '../../models/product.model';
import { RoomBooking } from '../../models/roomBooking.model';
import { UpdateCoffeeToBookingHandler } from '../../types/endpoints/room.endpoint';
import { NotFoundError } from '../../utils/errors/notfound-error';


export const updateCoffeeToBokkingHandler:UpdateCoffeeToBookingHandler = async (req,res,next)=>{
  
  const book = await RoomBooking.findOne({_id:req.params.bookId , coffeePaid:false});
  if (!book) 
    return next(new NotFoundError('book not found'));
  const coffeePrice = book.coffeePrice;
  const index = book.coffee.findIndex((el:any)=>el._id.toString()===req.body.coffeeId);

  if (index === -1) 
    return next(new NotFoundError('coffee not found'));

  if (req.body.count === 0) {
    book.coffee.splice(index , 1);
  }else{
    book.coffee[index].count = req.body.count;
  }

  let totalCount = 0;

  for (let i = 0; i < book.coffee.length; i++) {
    const product = await Product.findById(book.coffee[i].product);
    totalCount += product!.price * book.coffee[i].count;  
  }
  book.coffeePrice = totalCount;
  book.totalPrice = (book.totalPrice - coffeePrice) + totalCount;
  const newBook = await (await book.save()).populate([
    {path:'user' , select:'email username'},
    {path:'room'},
    {path:'plan'},
    {path:'coffee.product'}
  ]);

  res.status(200).json({message:'success' , data:newBook});
};