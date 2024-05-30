import { RequestHandler } from 'express';

import { Imember } from '../../models/members.model';
import { PaginationResponse, successResponse } from '../response';



export interface CreateMemberHandler
extends RequestHandler<unknown , successResponse<{data:Imember}> , Pick<Imember , 'details' | 'title' | 'price' | 'duration' | 'durationType'> , unknown>{}

export interface UpdateMemberHandler
extends RequestHandler<{memberId:string} , successResponse<{data:Imember}> , Pick<Imember ,'title' | 'price' | 'duration' | 'durationType'> , unknown>{}

export interface UpdateMemberDetailHandler
extends RequestHandler<{memberId:string} , successResponse<{data:Imember}> , {detailId:string , title:string} , unknown>{}

export interface DeleteMemberDetailHandler
extends RequestHandler<{memberId:string} , successResponse ,{detailId:string} , unknown>{}

export interface DeleteMemberHandler
extends RequestHandler<{memberId:string} , successResponse ,unknown, unknown>{}

export interface GetMemberHandler
extends RequestHandler<{memberId:string} , successResponse<{data:Imember}> ,unknown, unknown>{}

export interface GetMembersHandler
extends RequestHandler<unknown , PaginationResponse<{data:Imember[]}> ,unknown, unknown>{}

