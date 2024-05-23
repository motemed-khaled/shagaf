import { RequestHandler } from 'express';

import { Ioffer } from '../../models/offers.model';
import { PaginationResponse, successResponse } from '../response';







export interface CreateOfferHandler
extends RequestHandler<unknown , successResponse<{data:Ioffer}> , Pick<Ioffer , 'bookingNum' | 'cover' | 'discount' | 'from' | 'name' | 'title' | 'to' | 'users'> , unknown>{}

export interface UpdateOfferHandler
extends RequestHandler<{offerId:string} , successResponse<{data:Ioffer}> , Pick<Ioffer , 'bookingNum' | 'cover' | 'discount' | 'from' | 'name' | 'title' | 'to' | 'users'> , unknown>{}

export interface GetOfferHandler
extends RequestHandler<{offerId:string} , successResponse<{data:Ioffer}> , unknown , unknown>{}

export interface GetOffersHandler
extends RequestHandler<unknown , PaginationResponse<{data:Ioffer[]}> , unknown , unknown>{}

export interface DeleteOfferHandler
extends RequestHandler<{offerId:string} , successResponse , unknown , unknown>{}

export interface GetLoggedUserOfferHandler
extends RequestHandler<unknown , PaginationResponse<{data:Ioffer[]}> , unknown , unknown>{}