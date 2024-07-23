import { RequestHandler } from 'express';

import 'express-async-errors';
import { Iroom, Room } from '../../models/rooms.model';
import { PaginationResponse } from '../../types/response';

export const getRoomsPagination: RequestHandler<
  unknown,
  unknown,
  unknown,
  {
    searchKeywords?: string[];
    location?: string;
    plans?: string;
    packages?: string;
    seatsAvailableMax?: number;
    seatsAvailableMin?: number;
    seatsNumMax?: number;
    seatsNumMin?: number;
    birthDay?:string
  }
> = async (req, res, next) => {
  req.pagination.filter = {};

  if (req.query.searchKeywords?.length) {
    req.pagination.filter.$or = req.query.searchKeywords.map((keyword: string) => ({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    }));
  }

  if (req.query.location) {
    req.pagination.filter.location = req.query.location;
  }

  if (req.query.plans) {
    req.pagination.filter.plans = req.query.plans;
  }

  if (req.query.packages) {
    req.pagination.filter.packages = req.query.packages;
  }

  if (req.query.seatsAvailableMin || req.query.seatsAvailableMax) {
    req.pagination.filter.seatsAvailable = {};
    if (req.query.seatsAvailableMin) {
      req.pagination.filter.seatsAvailable.$gte = Number(req.query.seatsAvailableMin);
    }
    if (req.query.seatsAvailableMax) {
      req.pagination.filter.seatsAvailable.$lte = Number(req.query.seatsAvailableMax);
    }
  }

  if (req.query.seatsNumMin || req.query.seatsNumMax) {
    req.pagination.filter.seatsNum = {};
    if (req.query.seatsNumMin) {
      req.pagination.filter.seatsNum.$gte = Number(req.query.seatsNumMin);
    }
    if (req.query.seatsNumMax) {
      req.pagination.filter.seatsNum.$lte = Number(req.query.seatsNumMax);
    }
  }

  if (req.query.birthDay !== undefined) {
    req.pagination.filter.birthDay = req.query.birthDay === 'true';
  }

  next();
};

export const getRoomsHandler: RequestHandler<
  unknown,
  PaginationResponse<{ data: Iroom[] }>,
  unknown,
  unknown
> = async (req, res) => {
  const rooms = await Room.find(req.pagination.filter)
    .sort({ createdAt: -1 })
    .skip(req.pagination.skip)
    .limit(req.pagination.limit)
    .populate([{ path: 'packages' }, { path: 'plans' }, { path: 'location' }]);

  const resultCount = await Room.countDocuments(req.pagination.filter);

  res.status(200).json({
    message: 'success',
    pagination: {
      currentPage: req.pagination.page,
      resultCount,
      totalPages: Math.ceil(resultCount / req.pagination.limit),
    },
    data: rooms,
  });
};
