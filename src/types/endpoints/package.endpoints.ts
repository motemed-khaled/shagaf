import { RequestHandler } from 'express';

import { IPackage } from '../../models/package.model';
import { PaginationResponse, successResponse } from '../response';

export interface CreatePackageHandler
  extends RequestHandler<
    unknown,
    successResponse<{ data: IPackage }>,
    Pick<IPackage, 'duration' | 'extraPrice' | 'price' | 'products' | 'title'>,
    unknown
  > {}

export interface UpdatePackageHandler
  extends RequestHandler<
    { packageId: string },
    successResponse<{ data: IPackage }>,
    Partial<Pick<IPackage, 'duration' | 'extraPrice' | 'price' | 'products' | 'title'>>,
    unknown
  > {}

export interface DeletePackageHandler
  extends RequestHandler<{ packageId: string }, successResponse, unknown, unknown> {}

export interface GetPackagesHandler
  extends RequestHandler<unknown, PaginationResponse<{ data: IPackage[] }>, unknown, unknown> {}

export interface GetPackageHandler
  extends RequestHandler<
    { packageId: string },
    successResponse<{ data: IPackage }>,
    unknown,
    unknown
  > {}
