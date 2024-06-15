import 'express-async-errors';

import { RoomBooking } from '../../models/roomBooking.model';
import { GetUserBookingHandler } from '../../types/endpoints/room.endpoint';



export const getUserBookingHandler:GetUserBookingHandler = async (req,res)=>{
  const booking = await RoomBooking.find({user:req.loggedUser?.id}).populate([
    {path:'user' , select:'email username'},
    {path:'room'},
    {path:'plan'},
    {path:'member'}
  ]);

  res.status(200).json({message:'success' , data:booking});
};