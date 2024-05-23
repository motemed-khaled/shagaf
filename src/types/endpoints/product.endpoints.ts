import { RequestHandler } from 'express';

import { Iproduct } from '../../models/product.model';
import { PaginationResponse, successResponse } from '../response';





export interface CreateProductHandler
extends RequestHandler<unknown , successResponse<{data:Iproduct}> , Pick<Iproduct , 'category' | 'count' | 'cover' | 'price' | 'title'> , unknown>{}

export interface UpdateProductHandler
extends RequestHandler<{productId:string} , successResponse<{data:Iproduct}> , Pick<Iproduct , 'category'|'count'|'cover'|'price'|'title'> , unknown>{}

export interface GetProductHandler
extends RequestHandler<{productId:string} , successResponse<{data:Iproduct}> , unknown , unknown>{}

export interface GetProductsHandler
extends RequestHandler<unknown , PaginationResponse<{data:Iproduct[]}> , unknown , unknown>{}

export interface DeleteProductHandler
extends RequestHandler<{productId:string} , successResponse , unknown , unknown>{}