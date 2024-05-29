import { RequestHandler } from 'express';

import { IAuditLog } from '../../models/roomBookingLog.schema';
import { PaginationResponse } from '../response';






export interface GetLogierForBookingHandler
extends RequestHandler<{bookId:string} , PaginationResponse<{data:IAuditLog[]}> , unknown , unknown>{}

