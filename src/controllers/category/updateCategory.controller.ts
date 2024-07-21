import 'express-async-errors';

import { Category } from '../../models/category.model';
import { UpdateCategoryHandler } from '../../types/endpoints/category.endpoints';
import { FOLDERS } from '../../types/folders';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';

export const updateCategoryHandler: UpdateCategoryHandler = async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId);

  if (!category) return next(new NotFoundError('category not found'));

  const cover = <Express.Multer.File[]>(req.files as any).cover;

  if (cover?.length) {
    req.body.cover = `/media/${FOLDERS.category}/${cover[0].filename}`;
    Files.removeFiles(category.cover);
  }

  const updatedCategory = await Category.findByIdAndUpdate(req.params.categoryId, req.body, {
    new: true,
  });
  if (!updatedCategory) return next(new BadRequestError('failed to update category'));

  res.status(200).json({ message: 'success', data: updatedCategory });
};
