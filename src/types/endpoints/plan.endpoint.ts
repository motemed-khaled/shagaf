import { RequestHandler } from 'express';

import 'express-async-errors';
import { Iplan } from '../../models/plan.model';
import { PaginationResponse, successResponse } from '../response';




export interface CreatePlanHander
extends RequestHandler<unknown , successResponse<{data:Iplan}> , Pick<Iplan , 'icon' | 'price' | 'stamp'> , unknown>{}


export interface UpdatePlanHandler
extends RequestHandler<{planId:string} , successResponse<{data:Iplan}> , Partial<Pick<Iplan , 'icon'  | 'price' | 'stamp'>> , unknown>{}

export interface DeletePlanHandler
extends RequestHandler<{planId:string} , successResponse , unknown , unknown>{}

export interface GetPlanHandler
extends RequestHandler<{planId:string} , successResponse<{data:Iplan}> , unknown , unknown>{}

export interface GetPlansHandler
extends RequestHandler<unknown , PaginationResponse<{data:Iplan[]}> , unknown , unknown>{}

