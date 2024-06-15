import 'express-async-errors';

import { RequestHandler } from 'express';

import { DayBook } from '../../models/dayBook.model';
import { GetAllBookingHandler } from '../../types/endpoints/birthday.endpoint';


export const getDayBooksPagination: RequestHandler<
  unknown,
  unknown,
  unknown,
  {
    user?: string;
    voucher?: string;
    startDate?: string;
    endDate?: string;
    totalPriceMin?: number;
    totalPriceMax?: number;
    paid?: boolean;
    status?:string;
  }
> = async (req, res, next) => {
  req.pagination.filter = {};

  if (req.query.user) {
    req.pagination.filter.user = req.query.user;
  }

  if (req.query.status) {
    req.pagination.filter.status = req.query.status;
  }
  if (req.query.voucher) {
    req.pagination.filter.voucher = req.query.voucher;
  }

  if (req.query.startDate) {
    req.pagination.filter.startDate = { $gte: new Date(req.query.startDate) };
  }

  if (req.query.endDate) {
    req.pagination.filter.endDate = { $lte: new Date(req.query.endDate) };
  }

  if (req.query.totalPriceMin !== undefined) {
    req.pagination.filter.totalPrice = req.pagination.filter.totalPrice || {};
    req.pagination.filter.totalPrice.$gte = Number(req.query.totalPriceMin);
  }

  if (req.query.totalPriceMax !== undefined) {
    req.pagination.filter.totalPrice = req.pagination.filter.totalPrice || {};
    req.pagination.filter.totalPrice.$lte = Number(req.query.totalPriceMax);
  }

  if (req.query.paid !== undefined) {
    req.pagination.filter.paid = req.query.paid === Boolean(req.query.paid);
  }

  next();
};


export const getAllBookingHandler:GetAllBookingHandler =  async (req,res)=>{
  const booking = await DayBook.find(req.pagination.filter).skip(req.pagination.skip).limit(req.pagination.limit).populate([
    {path:'user' , select:'username email'},
    {path:'products.product'}
  ]);

  const resultCount = await DayBook.find(req.pagination.filter).countDocuments();

  res.status(200).json({
    message:'success',
    pagination:{
      currentPage:req.pagination.page,
      resultCount,
      totalPages:Math.ceil(resultCount/req.pagination.limit)
    },
    data:booking
  });
};