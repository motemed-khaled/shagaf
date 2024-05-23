import { RequestHandler } from 'express';

import { Ievent } from '../../models/event.model';
import { PaginationResponse, successResponse } from '../response';



export interface CreateEventHandler
extends RequestHandler<unknown , successResponse<{data:Ievent}> , Pick<Ievent , 'cost'|'cover'|'details'|'location'|'title' | 'date'> , unknown>{}

export interface UpdateEventHandler
extends RequestHandler<{eventId:string} , successResponse<{data:Ievent}> , Partial<Pick<Ievent , 'cost'|'cover'|'location'|'title' | 'date'>> , unknown>{}

export interface GetEventHandler
extends RequestHandler<{eventId:string} , successResponse<{data:Ievent}> , unknown , unknown>{}

export interface DeleteEventHandler
extends RequestHandler<{eventId:string} , successResponse , unknown , unknown>{}

export interface GetEventsHandler
extends RequestHandler<unknown , PaginationResponse<{data:Ievent[]}> , unknown , unknown>{}

export interface UpdateDetailsHandler
extends RequestHandler<{eventId:string} , successResponse<{data:Ievent}> , {title:string , titleId:string} , unknown>{}

export interface DeleteDetailHandler
extends RequestHandler<{eventId:string} , successResponse , {titleId:string} , unknown>{}