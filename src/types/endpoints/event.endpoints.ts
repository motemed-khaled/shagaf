import { RequestHandler } from 'express';

import { Ievent } from '../../models/event.model';
import { IeventBook } from '../../models/eventBook.model';
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

export interface BookEventHandler
extends RequestHandler<unknown , successResponse<{data:IeventBook}> , Pick<IeventBook , 'event' | 'user' | 'pointDiscount' | 'stuffDiscount'> , unknown>{}

export interface GetUserEventBookHandler
extends RequestHandler<unknown , successResponse<{data:IeventBook[]}> , unknown , unknown>{}
export interface GetEventsBookHandler
extends RequestHandler<unknown , PaginationResponse<{data:IeventBook[]}> , unknown , unknown>{}
export interface GetEventBookHandler
extends RequestHandler<{bookId:string} , successResponse<{data:IeventBook}> , unknown , unknown>{}

export interface UpdateEventBookPaymentHandler
extends RequestHandler<{bookId:string} , successResponse , unknown , unknown>{}
