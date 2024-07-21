import 'express-async-errors';

import { Category } from '../../models/category.model';
import { DeleteCategoryHandler } from '../../types/endpoints/category.endpoints';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';

export const deletCategoryHandler: DeleteCategoryHandler = async (req, res, next) => {
  const deletedCategory = await Category.findByIdAndDelete(req.params.categoryId);
  if (!deletedCategory) return next(new NotFoundError('category not found'));

  Files.removeFiles(deletedCategory.cover);
  res.status(204).json({ message: 'success' });
};
