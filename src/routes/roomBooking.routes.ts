import express from 'express';

import * as handlers from '../controllers/roomBooking';
import { isauthenticated } from '../guards/auth.guard';
import * as val from '../validation/roomBooking.val';

export const router = express.Router();

router.route('/').post(isauthenticated, val.validateRoomBooking, handlers.createNewBookHandler);
