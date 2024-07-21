import 'express-async-errors';

import { Product } from '../../models/product.model';
import { CreateProductHandler } from '../../types/endpoints/product.endpoints';
import { FOLDERS } from '../../types/folders';

export const createProductHandler: CreateProductHandler = async (req, res) => {
  const cover = <Express.Multer.File[]>(req.files as any).cover;

  if (cover.length) req.body.cover = `/media/${FOLDERS.product}/${cover[0].filename}`;

  const product = await Product.create(req.body);
  res.status(201).json({ message: 'success', data: product });
};
