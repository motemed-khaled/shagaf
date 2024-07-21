import 'express-async-errors';

import { BirthDay } from '../../models/birthDay.model';
import { UpdateDayHandler } from '../../types/endpoints/birthday.endpoint';
import { FOLDERS } from '../../types/folders';
import { BadRequestError } from '../../utils/errors/bad-request-error';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';

export const updateDayHandler: UpdateDayHandler = async (req, res, next) => {
  const day = await BirthDay.findById(req.params.dayId);

  if (!day) return next(new NotFoundError('day not found'));

  const cover = <Express.Multer.File[]>(req.files as any).cover;

  if (cover?.length) {
    req.body.cover = `/media/${FOLDERS.birthday}/${cover[0].filename}`;
    Files.removeFiles(day.cover);
  }

  const updatedDay = await BirthDay.findByIdAndUpdate(req.params.dayId, req.body, { new: true });
  if (!updatedDay) return next(new BadRequestError('failed to update day'));

  res.status(200).json({ message: 'success', data: updatedDay });
};
