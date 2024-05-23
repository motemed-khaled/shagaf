import { RequestHandler } from 'express';

import { Ibirthday } from '../../models/birthDay.model';
import { PaginationResponse, successResponse } from '../response';




export interface CreateDayHandler
extends RequestHandler<unknown , successResponse<{data:Ibirthday}> , Pick<Ibirthday , 'cover' | 'price' | 'title' | 'type'> , unknown>{}

export interface UpdateDayHandler
extends RequestHandler<{dayId:string} , successResponse<{data:Ibirthday}> , Partial<Pick<Ibirthday , 'cover' | 'price' | 'title' | 'type'>> , unknown>{}

export interface GetDayHandler
extends RequestHandler<{dayId:string} , successResponse<{data:Ibirthday}> , unknown , unknown>{}

export interface GetDaysHandler
extends RequestHandler<unknown , PaginationResponse<{data:Ibirthday[]}> , unknown , unknown>{}

export interface DeleteDayHandler
extends RequestHandler<{dayId:string} , successResponse , unknown , unknown>{}
