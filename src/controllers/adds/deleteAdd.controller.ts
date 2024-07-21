import 'express-async-errors';

import { Advertisement } from '../../models/advertisment.model';
import { DeleteAddHandler } from '../../types/endpoints/advertisment.endpoint';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';

export const deleteAddHandler: DeleteAddHandler = async (req, res, next) => {
  const deletedAdd = await Advertisement.findByIdAndDelete(req.params.addId);
  if (!deletedAdd) return next(new NotFoundError('add not found'));

  Files.removeFiles(deletedAdd.cover);

  res.status(204).json({ message: 'success' });
};
