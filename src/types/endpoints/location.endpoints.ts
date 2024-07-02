import { RequestHandler } from 'express';

import { Ilocation } from '../../models/location.model';
import { successResponse } from '../response';



export interface CreateLocationHandler
extends RequestHandler<unknown , successResponse<{data:Ilocation}> , Pick<Ilocation , 'name'> , unknown>{}

export interface UpdateLocationHandler
extends RequestHandler<{locationId:string} , successResponse<{data:Ilocation}> , Pick<Ilocation , 'name'> , unknown>{}

export interface GetLocationHandler
extends RequestHandler<{locationId:string} , successResponse<{data:Ilocation}> , unknown , unknown>{}

export interface GetLocationsHandler
extends RequestHandler<unknown , successResponse<{data:Ilocation[]}> , unknown , unknown>{}

export interface DeleteLocationHandler
extends RequestHandler<{locationId:string} , successResponse , unknown , unknown>{}