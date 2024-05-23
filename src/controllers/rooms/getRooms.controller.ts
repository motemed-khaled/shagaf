import 'express-async-errors';

import { RequestHandler } from 'express';

import { Room } from '../../models/rooms.model';
import { GetRoomsHandler } from '../../types/endpoints/room.endpoint';


export const getRoomsPagination: RequestHandler<
  unknown,
  unknown,
  unknown,
  {
    type?: string;
    location?: string;
    seatsAvailable?: number;
    seatsNum?: number;
    description?: string;
    title?: string;

  }
> = async (req, res, next) => {
  req.pagination.filter = {};

  if (req.query.location) {
    req.pagination.filter.location = { $in: Array.isArray(req.query.location) ? req.query.location : [req.query.location] };
  }
    
  if (req.query.seatsAvailable) {
    req.pagination.filter.seatsAvailable = { $gte: Number(req.query.seatsAvailable) }; 
  }
    
  if (req.query.seatsNum) {
    req.pagination.filter.seatsNum = { $gte: Number(req.query.seatsNum) }; 
  }
    
  if (req.query.description) {
    req.pagination.filter.description = { $regex: req.query.description, $options: 'i' }; 
  }
    
  if (req.query.title) {
    req.pagination.filter.title = { $regex: req.query.title, $options: 'i' }; 
  }

  next();
};

export const getRoomsHandler:GetRoomsHandler = async (req,res)=>{
  const rooms = await Room.find(req.pagination.filter)
    .limit(req.pagination.limit)
    .skip(req.pagination.skip)
    .populate('plans');

  const resultCount = await  Room.find(req.pagination.filter).countDocuments();

  res.status(200).json({message:'success',
    pagination:{
      currentPage:req.pagination.page,
      resultCount,
      totalPages:Math.ceil(resultCount/req.pagination.limit)
    }
    , data:rooms});
};