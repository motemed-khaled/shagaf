import 'express-async-errors';

import { Advertisement } from '../../models/advertisment.model';
import { UpdateAdvertisementHandler } from '../../types/endpoints/advertisment.endpoint';
import { FOLDERS } from '../../types/folders';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';

export const updateAddHandler: UpdateAdvertisementHandler = async (req, res, next) => {
  const add = await Advertisement.findById(req.params.addId);

  if (!add) return next(new NotFoundError('add not found'));

  const cover = <Express.Multer.File[]>(req.files as any).cover;

  if (cover.length) {
    Files.removeFiles(add.cover);
    add.cover = `/media/${FOLDERS.adds}/${cover[0].filename}`;
  }

  await add.save();

  res.status(200).json({ message: 'success', data: add });
};
