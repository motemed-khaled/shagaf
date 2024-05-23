import 'express-async-errors';

import { RequestHandler } from 'express';

import { BirthDay } from '../../models/birthDay.model';
import { GetDaysHandler } from '../../types/endpoints/birthday.endpoint';



export const getBirthdaysPagination: RequestHandler<
  unknown,
  unknown,
  unknown,
  {
    type?: string;
    title?: string;
    priceMin?: number;
    priceMax?: number;
  }
> = async (req, res, next) => {
  req.pagination = req.pagination || {};
  req.pagination.filter = {};

  if (req.query.type) {
    req.pagination.filter.type = { $in: Array.isArray(req.query.type) ? req.query.type : [req.query.type] };
  }

  if (req.query.title) {
    req.pagination.filter.title = { $regex: req.query.title, $options: 'i' };
  }

  if (req.query.priceMin) {
    req.pagination.filter.price = { ...req.pagination.filter.price, $gte: Number(req.query.priceMin) };
  }
  if (req.query.priceMax) {
    req.pagination.filter.price = { ...req.pagination.filter.price, $lte: Number(req.query.priceMax) };
  }

  next();
};


export const getDaysHandler:GetDaysHandler = async (req,res)=>{
  const days = await BirthDay.find(req.pagination.filter).limit(req.pagination.limit).skip(req.pagination.skip);

  const resultCount = await BirthDay.find(req.pagination.filter).countDocuments();

  res.status(200).json({
    message:'success',
    pagination:{
      currentPage:req.pagination.page,
      resultCount,
      totalPages:Math.ceil(resultCount/req.pagination.limit)
    },
    data:days
  });
};