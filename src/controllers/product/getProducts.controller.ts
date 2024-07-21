import 'express-async-errors';

import { RequestHandler } from 'express';

import { Product } from '../../models/product.model';
import { GetProductsHandler } from '../../types/endpoints/product.endpoints';

export const getProductsPagination: RequestHandler<
  unknown,
  unknown,
  unknown,
  {
    category?: string;
    priceMin?: number;
    priceMax?: number;
    title?: string;
    countMin?: number;
    countMax?: number;
  }
> = async (req, res, next) => {
  req.pagination = req.pagination || {};
  req.pagination.filter = {};

  // Filter by category
  if (req.query.category) {
    req.pagination.filter.category = req.query.category;
  }

  // Filter by price range
  if (req.query.priceMin) {
    req.pagination.filter.price = {
      ...req.pagination.filter.price,
      $gte: Number(req.query.priceMin),
    };
  }
  if (req.query.priceMax) {
    req.pagination.filter.price = {
      ...req.pagination.filter.price,
      $lte: Number(req.query.priceMax),
    };
  }

  // Filter by title with case-insensitive regex
  if (req.query.title) {
    req.pagination.filter.title = { $regex: req.query.title, $options: 'i' };
  }

  // Filter by count range
  if (req.query.countMin) {
    req.pagination.filter.count = {
      ...req.pagination.filter.count,
      $gte: Number(req.query.countMin),
    };
  }
  if (req.query.countMax) {
    req.pagination.filter.count = {
      ...req.pagination.filter.count,
      $lte: Number(req.query.countMax),
    };
  }

  next();
};

export const getProductsHandler: GetProductsHandler = async (req, res) => {
  const products = await Product.find(req.pagination.filter)
    .limit(req.pagination.limit)
    .skip(req.pagination.skip);

  const resultCount = await Product.find(req.pagination.filter).countDocuments();

  res.status(200).json({
    message: 'success',
    pagination: {
      currentPage: req.pagination.page,
      resultCount,
      totalPages: Math.ceil(resultCount / req.pagination.limit),
    },
    data: products,
  });
};
