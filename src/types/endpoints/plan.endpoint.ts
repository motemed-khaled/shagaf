import { RequestHandler } from 'express';

import { IPlan } from '../../models/plan.model';
import { PaginationResponse, successResponse } from '../response';

export interface CreatePlanHandler
  extends RequestHandler<
    unknown,
    successResponse<{ data: IPlan }>,
    Pick<IPlan, 'birthDay' | 'private' | 'shared' | 'icon' | 'title' | 'type'>,
    unknown
  > {}

export interface UpdatePlanHandler
  extends RequestHandler<
    { planId: string },
    successResponse<{ data: IPlan }>,
    Partial<Pick<IPlan, 'birthDay' | 'icon' | 'private' | 'shared' | 'title' | 'type'>>,
    unknown
  > {}

export interface GetPlansHandler
  extends RequestHandler<
    unknown,
    PaginationResponse<{ data: IPlan[] }>,
    unknown,
    { type?: string }
  > {}

export interface GetPlanHandler
  extends RequestHandler<{ planId: string }, successResponse<{ data: IPlan }>, unknown, unknown> {}

export interface DeletePlanHandler
  extends RequestHandler<{ planId: string }, successResponse, unknown, unknown> {}
