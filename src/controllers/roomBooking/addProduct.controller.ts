import 'express-async-errors';
import { RequestHandler } from 'express';
import { Types } from 'mongoose';

import { Package } from '../../models/package.model';
import { Product } from '../../models/product.model';
import { IRoomBooking, RoomBooking } from '../../models/roomBooking.model';
import { successResponse } from '../../types/response';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';

interface ProductInput {
  product: string;
  count: number;
  free?: boolean;
  price?: number;
}

export const addProductHandler: RequestHandler<
  { bookId: string },
  successResponse<{ data: IRoomBooking }>,
  { products: ProductInput[] },
  unknown
> = async (req, res, next) => {
  const book = await RoomBooking.findById(req.params.bookId);

  if (!book) {
    return next(new NotFoundError('Book not found'));
  }

  if (book.productPaid)
    return next(new BadRequestError('can not add more product in this booking after paid'));

  const productsCount = await Product.countDocuments({
    _id: { $in: req.body.products.map((el) => el.product) },
    count: { $ne: 0 },
  });

  if (productsCount !== req.body.products.length) {
    return next(new BadRequestError('Invalid products'));
  }

  const updatedProducts: ProductInput[] = [];
  const productUpdates: { productId: string; count: number }[] = [];

  if (book.package) {
    const existPackage = await Package.findById(book.package);

    if (!existPackage) {
      return next(new NotFoundError('Package not found'));
    }

    if (existPackage.products.length > 0) {
      const packageProducts: { [key: string]: number } = existPackage.products.reduce(
        (acc, pkgProd) => {
          acc[pkgProd.product.toString()] = pkgProd.count;
          return acc;
        },
        {} as { [key: string]: number },
      );

      for (const product of req.body.products) {
        const productData = await Product.findById(product.product);

        if (!productData) {
          return next(new NotFoundError(`Product not found: ${product.product}`));
        }

        const packageProductCount = packageProducts[product.product] || 0;
        const totalRequiredCount = product.count;

        if (productData.count < totalRequiredCount) {
          return next(new BadRequestError(`Insufficient count for product: ${product.product}`));
        }

        if (packageProductCount) {
          if (totalRequiredCount > packageProductCount) {
            updatedProducts.push({
              product: product.product,
              count: packageProductCount,
              free: true,
              price: productData.price,
            });
            updatedProducts.push({
              product: product.product,
              count: totalRequiredCount - packageProductCount,
              free: false,
              price: productData.price,
            });
          } else {
            updatedProducts.push({
              ...product,
              free: true,
              price: productData.price,
            });
          }
        } else {
          updatedProducts.push({
            ...product,
            free: false,
            price: productData.price,
          });
        }

        productUpdates.push({ productId: product.product, count: totalRequiredCount });
      }
    }
  } else {
    for (const product of req.body.products) {
      const productData = await Product.findById(product.product);

      if (!productData) {
        return next(new NotFoundError(`Product not found: ${product.product}`));
      }

      const totalRequiredCount = product.count;

      if (productData.count < totalRequiredCount) {
        return next(new BadRequestError(`Insufficient count for product: ${product.product}`));
      }

      updatedProducts.push({
        ...product,
        free: false,
        price: productData.price,
      });

      productUpdates.push({ productId: product.product, count: totalRequiredCount });
    }
  }

  // Decrement the product counts after all checks have passed
  for (const update of productUpdates) {
    await Product.findByIdAndUpdate(update.productId, {
      $inc: { count: -update.count },
    });
  }

  // Ensure the updated products match the expected type
  book.products = updatedProducts.map((product) => ({
    product: product.product as unknown as Types.ObjectId,
    free: product.free!,
    count: product.count,
    price: product.price!,
  })) as IRoomBooking['products'];

  const totalPrice = updatedProducts
    .filter((product) => !product.free)
    .reduce((sum, product) => sum + product.price! * product.count, 0);

  book.productPrice = book.productPrice + totalPrice;

  await book.save();

  res.status(200).json({ message: 'success', data: book });
};
