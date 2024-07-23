import { RequestHandler } from 'express';

import { ImemberBooking } from '../../models/memberBooking.model';
import { Imember } from '../../models/members.model';
import { PaginationResponse, successResponse } from '../response';

export interface CreateMemberHandler
  extends RequestHandler<
    unknown,
    successResponse<{ data: Imember }>,
    Pick<Imember, 'details' | 'title' | 'price' | 'duration' | 'durationType' | 'end' | 'type'>,
    unknown
  > {}

export interface UpdateMemberHandler
  extends RequestHandler<
    { memberId: string },
    successResponse<{ data: Imember }>,
    Pick<Imember, 'title' | 'price' | 'duration' | 'durationType' | 'details' | 'end' | 'type'>,
    unknown
  > {}

export interface UpdateMemberDetailHandler
  extends RequestHandler<
    { memberId: string },
    successResponse<{ data: Imember }>,
    { detailId: string; title: string },
    unknown
  > {}

export interface DeleteMemberDetailHandler
  extends RequestHandler<{ memberId: string }, successResponse, { detailId: string }, unknown> {}

export interface DeleteMemberHandler
  extends RequestHandler<{ memberId: string }, successResponse, unknown, unknown> {}

export interface GetMemberHandler
  extends RequestHandler<
    { memberId: string },
    successResponse<{ data: Imember }>,
    unknown,
    unknown
  > {}

export interface GetMembersHandler
  extends RequestHandler<unknown, PaginationResponse<{ data: Imember[] }>, unknown, unknown> {}

// booking
export interface BookMemberShipHandler
  extends RequestHandler<
    unknown,
    successResponse<{ data: ImemberBooking }>,
    Pick<ImemberBooking, 'member' | 'end' | 'user' | 'stuffDiscount'> & { pointDiscount: boolean },
    unknown
  > {}

export interface UpdateBookHandler
  extends RequestHandler<
    { bookId: string },
    successResponse<{ data: ImemberBooking }>,
    { voucher: string },
    unknown
  > {}

export interface GetMemberBookHandler
  extends RequestHandler<
    { bookId: string },
    successResponse<{ data: ImemberBooking }>,
    unknown,
    unknown
  > {}

export interface GetMembersBookingHandler
  extends RequestHandler<
    unknown,
    PaginationResponse<{ data: ImemberBooking[] }>,
    unknown,
    unknown
  > {}

export interface GetLoggedUserMemberBookingHandler
  extends RequestHandler<
    unknown,
    PaginationResponse<{ data: ImemberBooking[] }>,
    unknown,
    unknown
  > {}

export interface UpdateBookPaymentHandler
  extends RequestHandler<
    { bookId: string },
    successResponse<{ data: ImemberBooking }>,
    unknown,
    unknown
  > {}
