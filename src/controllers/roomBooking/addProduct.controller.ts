import { RequestHandler } from 'express';

import 'express-async-errors';
import { Package } from '../../models/package.model';
import { Product } from '../../models/product.model';
import { IRoomBooking, RoomBooking } from '../../models/roomBooking.model';
import { successResponse } from '../../types/response';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';

interface Product {
  product: string;
  count: number;
  free: boolean;
  price: number;
}

export const addProductHandler: RequestHandler<
  { bookId: string },
  successResponse<{ data: IRoomBooking }>,
  { products: Product[] },
  unknown
> = async (req, res, next) => {
  const book = await RoomBooking.findById(req.params.bookId);

  if (!book) {
    return next(new NotFoundError('Book not found'));
  }

  const products = await Product.countDocuments({
    _id: { $in: req.body.products.map((el) => el.product) },
    count: { $ne: 0 },
  });

  if (products !== req.body.products.length) {
    return next(new BadRequestError('Invalid products'));
  }

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

      const updatedProducts: Product[] = [];

      for (const product of req.body.products) {
        const productData = await Product.findById(product.product);

        if (!productData) {
          return next(new NotFoundError(`Product not found: ${product.product}`));
        }

        const packageProductCount = packageProducts[product.product];

        if (packageProductCount) {
          if (product.count > packageProductCount) {
            updatedProducts.push({
              product: product.product,
              count: packageProductCount,
              free: true,
              price: productData.price,
            });
            updatedProducts.push({
              product: product.product,
              count: product.count - packageProductCount,
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
      }
      req.body.products = updatedProducts;
    }
  } else {
    const updatedProducts: Product[] = [];

    for (const product of req.body.products) {
      const productData = await Product.findById(product.product);

      if (!productData) {
        return next(new NotFoundError(`Product not found: ${product.product}`));
      }

      updatedProducts.push({
        ...product,
        free: false,
        price: productData.price,
      });
    }

    req.body.products = updatedProducts;
  }

  //   if (book.productPaid) {

  //   }
};
