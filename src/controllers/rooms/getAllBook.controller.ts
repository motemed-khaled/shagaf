import 'express-async-errors';

import { RequestHandler } from 'express';

import { RoomBooking } from '../../models/roomBooking.model';
import { GetAllBookingHandler } from '../../types/endpoints/room.endpoint';


export const getRoomBookingsPagination: RequestHandler<
  unknown,
  unknown,
  unknown,
  {
    user?: string;
    room?: string;
    startDate?: string;
    endDate?: string;
    paid?: string;
  }
> = async (req, res, next) => {
  req.pagination = req.pagination || {};
  req.pagination.filter = {};

  if (req.query.user) {
    req.pagination.filter.user = req.query.user;
  }

  if (req.query.room) {
    req.pagination.filter.room = req.query.room;
  }

  if (req.query.startDate) {
    req.pagination.filter.startDate = { $gte: new Date(req.query.startDate) };
  }

  if (req.query.endDate) {
    req.pagination.filter.endDate = { $lte: new Date(req.query.endDate) };
  }

  if (req.query.paid) {
    req.pagination.filter.paid = req.query.paid === 'true';
  }

  next();
};



export const getAllBookingHandler:GetAllBookingHandler = async (req,res)=>{
  const booking = await RoomBooking.find(req.pagination.filter).skip(req.pagination.skip).limit(req.pagination.limit).populate([
    {path:'user' , select:'email username'},
    {path:'room'},
    {path:'plan'}
  ]);

  const resultCount = await RoomBooking.find(req.pagination.filter).countDocuments();

  res.status(200).json(
    {
      message:'success',
      pagination:{
        currentPage:req.pagination.page,
        resultCount,
        totalPages:Math.ceil(resultCount/req.pagination.limit)
      },
      data:booking
    }
  );
};