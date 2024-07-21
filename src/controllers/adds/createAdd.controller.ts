import 'express-async-errors';

import { Advertisement } from '../../models/advertisment.model';
import { CreateAdvertisementHandler } from '../../types/endpoints/advertisment.endpoint';
import { FOLDERS } from '../../types/folders';

export const createAddHandler: CreateAdvertisementHandler = async (req, res) => {
  const cover = <Express.Multer.File[]>(req.files as any).cover;

  if (cover.length) req.body.cover = `/media/${FOLDERS.adds}/${cover[0].filename}`;

  const add = await Advertisement.create(req.body);

  res.status(201).json({ message: 'success', data: add });
};
