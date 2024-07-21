import { RequestHandler } from 'express';

import { Icategory } from '../../models/category.model';
import { PaginationResponse, successResponse } from '../response';

export interface CreateCategoryHandler
  extends RequestHandler<
    unknown,
    successResponse<{ data: Icategory }>,
    Pick<Icategory, 'cover' | 'title'>,
    unknown
  > {}

export interface UpdateCategoryHandler
  extends RequestHandler<
    { categoryId: string },
    successResponse<{ data: Icategory }>,
    Partial<Pick<Icategory, 'cover' | 'title'>>,
    unknown
  > {}

export interface DeleteCategoryHandler
  extends RequestHandler<{ categoryId: string }, successResponse, unknown, unknown> {}

export interface GetCategoryHandler
  extends RequestHandler<
    { categoryId: string },
    successResponse<{ data: Icategory }>,
    unknown,
    unknown
  > {}

export interface GetCategoriesHandler
  extends RequestHandler<unknown, PaginationResponse<{ data: Icategory[] }>, unknown, unknown> {}
