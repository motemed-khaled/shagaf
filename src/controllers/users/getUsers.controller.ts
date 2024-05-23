import 'express-async-errors';

import { RequestHandler } from 'express';

import { Users } from '../../models/user.model';
import { GetAllUsersHandler } from '../../types/endpoints/user.endpoints';

export const getUsersPagination: RequestHandler<
  unknown,
  unknown,
  unknown,
  {
    username?: string;
    email?: string;
    phone?: string;
    isVerified?: string;
    birthdateFrom?: string;
    birthdateTo?: string;
  }
> = async (req, res, next) => {
  try {
    req.pagination.filter = {};

    if (req.query.username) {
      req.pagination.filter.username = { $regex: req.query.username, $options: 'i' };
    }

    if (req.query.email) {
      req.pagination.filter.email = { $regex: req.query.email, $options: 'i' };
    }

    if (req.query.phone) {
      req.pagination.filter.phone = { $regex: req.query.phone, $options: 'i' };
    }

    if (req.query.isVerified) {
      req.pagination.filter.isVerified = req.query.isVerified === 'true';
    }

    if (req.query.birthdateFrom && req.query.birthdateTo) {
      req.pagination.filter.birthdate = {
        $gte: new Date(req.query.birthdateFrom),
        $lte: new Date(req.query.birthdateTo),
      };
    } else if (req.query.birthdateFrom) {
      req.pagination.filter.birthdate = { $gte: new Date(req.query.birthdateFrom) };
    } else if (req.query.birthdateTo) {
      req.pagination.filter.birthdate = { $lte: new Date(req.query.birthdateTo) };
    }

    next();
  } catch (error) {
    next(error);
  }
};


export const getUsersHandler:GetAllUsersHandler = async (req,res)=>{
  const users = await Users.find(req.pagination.filter).limit(req.pagination.limit).skip(req.pagination.skip);

  const resultCount = await Users.find(req.pagination.filter).countDocuments();
  res.status(200).json({
    message:'success',
    pagination:{
      currentPage:req.pagination.page,
      resultCount,
      totalPages:Math.ceil(resultCount/req.pagination.limit)
    },
    data:users
  });
};