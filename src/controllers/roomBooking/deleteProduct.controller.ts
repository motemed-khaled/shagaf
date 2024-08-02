import { RequestHandler } from 'express';

import 'express-async-errors';
import { Product } from '../../models/product.model';
import { IRoomBooking, RoomBooking } from '../../models/roomBooking.model';
import { successResponse } from '../../types/response';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';

export const deleteProductHandler: RequestHandler<
  { bookId: string },
  successResponse<{ data: IRoomBooking }>,
  { itemId: string },
  unknown
> = async (req, res, next) => {
  const book = await RoomBooking.findById(req.params.bookId);

  if (!book) return next(new NotFoundError('book not found'));

  if (book.productPaid)
    return next(new BadRequestError('can not add more product in this booking after paid'));

  const productIndex = book.products.findIndex((pr: any) => pr._id.toString() === req.body.itemId);

  if (productIndex === -1) return next(new NotFoundError('item not found'));

  const productToRemove = book.products[productIndex];

  if (productToRemove.free) {
    book.products.splice(productIndex, 1);
  } else {
    book.productPrice = book.productPrice - productToRemove.price;
    book.products.splice(productIndex, 1);
  }

  await Product.findByIdAndUpdate(productToRemove.product, {
    $inc: { count: productToRemove.count },
  });

  await book.save();

  res.status(200).json({ message: 'success', data: book });
};
