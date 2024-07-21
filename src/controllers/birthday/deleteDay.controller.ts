import 'express-async-errors';

import { BirthDay } from '../../models/birthDay.model';
import { DeleteDayHandler } from '../../types/endpoints/birthday.endpoint';
import { NotFoundError } from '../../utils/errors/notfound-error';
import { Files } from '../../utils/file';

export const deleteDayHandler: DeleteDayHandler = async (req, res, next) => {
  const deletedDay = await BirthDay.findByIdAndDelete(req.params.dayId);
  if (!deletedDay) return next(new NotFoundError('day not found'));

  Files.removeFiles(deletedDay.cover);

  res.status(204).json({ message: 'success' });
};
