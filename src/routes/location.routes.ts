import express from 'express';


import * as handler from '../controllers/location';
import { isauthenticated } from '../guards/auth.guard';
import * as val from '../validation/location.val';




export const router = express.Router();

router.route('/').post(isauthenticated , val.Create , handler.createLocationHandler).get(handler.getLocationsHandler);

router.route('/:locationId').patch(isauthenticated , val.update  , handler.updateLocationHandler)
  .get( val.get , handler.getLocationHandler)
  .delete( isauthenticated , val.get , handler.deleteLocationHandler);