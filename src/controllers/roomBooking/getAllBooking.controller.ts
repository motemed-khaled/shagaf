import { RequestHandler } from 'express';

import 'express-async-errors';
import {
  IRoomBooking,
  ReservationPaidType,
  ReservationType,
  RoomBooking,
} from '../../models/roomBooking.model';
import { PaginationResponse } from '../../types/response';

export const getRoomBookingsPagination: RequestHandler<
  unknown,
  unknown,
  unknown,
  {
    userId?: string;
    roomId?: string;
    planId?: string;
    packageId?: string;
    startDate?: Date;
    endDate?: Date;
    reservationType?: ReservationType;
    reservationPaidType?: ReservationPaidType;
    productPaid?: boolean;
    extraPaid?: boolean;
    closed?: boolean;
    seatsCountFrom?: number;
    seatsCountTo?: number;
    reservationPriceFrom?: number;
    reservationPriceTo?: number;
    productPriceFrom?: number;
    productPriceTo?: number;
    extraPriceFrom?: number;
    extraPriceTo?: number;
  }
> = async (req, res, next) => {
  req.pagination.filter = {};

  if (req.query.userId) {
    req.pagination.filter.user = req.query.userId;
  }

  if (req.query.roomId) {
    req.pagination.filter.room = req.query.roomId;
  }

  if (req.query.planId) {
    req.pagination.filter.plan = req.query.planId;
  }

  if (req.query.packageId) {
    req.pagination.filter.package = req.query.packageId;
  }

  if (req.query.startDate || req.query.endDate) {
    req.pagination.filter.start = {};
    if (req.query.startDate) {
      req.pagination.filter.start.$gte = new Date(req.query.startDate);
    }
    if (req.query.endDate) {
      req.pagination.filter.end.$lte = new Date(req.query.endDate);
    }
  }

  if (req.query.reservationType) {
    req.pagination.filter.reservationType = req.query.reservationType;
  }

  if (req.query.reservationPaidType) {
    req.pagination.filter.reservationPaidType = req.query.reservationPaidType;
  }

  if (req.query.productPaid !== undefined) {
    req.pagination.filter.productPaid = req.query.productPaid;
  }

  if (req.query.extraPaid !== undefined) {
    req.pagination.filter.extraPaid = req.query.extraPaid;
  }

  if (req.query.closed !== undefined) {
    req.pagination.filter.closed = req.query.closed;
  }

  if (req.query.seatsCountFrom || req.query.seatsCountTo) {
    req.pagination.filter.seatsCount = {};
    if (req.query.seatsCountFrom) {
      req.pagination.filter.seatsCount.$gte = Number(req.query.seatsCountFrom);
    }
    if (req.query.seatsCountTo) {
      req.pagination.filter.seatsCount.$lte = Number(req.query.seatsCountTo);
    }
  }

  if (req.query.reservationPriceFrom || req.query.reservationPriceTo) {
    req.pagination.filter.reservationPrice = {};
    if (req.query.reservationPriceFrom) {
      req.pagination.filter.reservationPrice.$gte = Number(req.query.reservationPriceFrom);
    }
    if (req.query.reservationPriceTo) {
      req.pagination.filter.reservationPrice.$lte = Number(req.query.reservationPriceTo);
    }
  }

  if (req.query.productPriceFrom || req.query.productPriceTo) {
    req.pagination.filter.productPrice = {};
    if (req.query.productPriceFrom) {
      req.pagination.filter.productPrice.$gte = Number(req.query.productPriceFrom);
    }
    if (req.query.productPriceTo) {
      req.pagination.filter.productPrice.$lte = Number(req.query.productPriceTo);
    }
  }

  if (req.query.extraPriceFrom || req.query.extraPriceTo) {
    req.pagination.filter.extraPrice = {};
    if (req.query.extraPriceFrom) {
      req.pagination.filter.extraPrice.$gte = Number(req.query.extraPriceFrom);
    }
    if (req.query.extraPriceTo) {
      req.pagination.filter.extraPrice.$lte = Number(req.query.extraPriceTo);
    }
  }

  next();
};

export const getAllBookingHandler: RequestHandler<
  unknown,
  PaginationResponse<{ data: IRoomBooking[] }>,
  unknown,
  unknown
> = async (req, res) => {
  const book = await RoomBooking.find(req.pagination.filter)
    .sort({ createdAt: -1 })
    .skip(req.pagination.skip)
    .limit(req.pagination.limit)
    .populate([
      { path: 'package' },
      { path: 'plan' },
      { path: 'room' },
      { path: 'user' },
      { path: 'products.product' },
    ]);

  const resultCount = await RoomBooking.countDocuments(req.pagination.filter);

  res.status(200).json({
    message: 'success',
    pagination: {
      currentPage: req.pagination.page,
      resultCount,
      totalPages: Math.ceil(resultCount / req.pagination.limit),
    },
    data: book,
  });
};
