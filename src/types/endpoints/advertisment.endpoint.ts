import { RequestHandler } from 'express';

import { Iadvertisment } from '../../models/advertisment.model';
import { successResponse } from '../response';






export interface CreateAdvertisementHandler
extends RequestHandler<unknown , successResponse<{data:Iadvertisment}> , Pick<Iadvertisment , 'cover'> , unknown>{}

export interface UpdateAdvertisementHandler
extends RequestHandler<{addId:string} , successResponse<{data:Iadvertisment}> , Pick<Iadvertisment , 'cover'> , unknown>{}

export interface GetAddHandler
extends RequestHandler<{addId:string} , successResponse<{data:Iadvertisment}> , unknown , unknown>{}

export interface GetAddsHandler
extends RequestHandler<unknown , successResponse<{data:Iadvertisment[]}> , unknown , unknown>{}

export interface DeleteAddHandler
extends RequestHandler<{addId:string} , successResponse , unknown , unknown>{}