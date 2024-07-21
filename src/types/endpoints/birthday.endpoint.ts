import { RequestHandler } from 'express';

import { Ibirthday } from '../../models/birthDay.model';
import { IdayBook } from '../../models/dayBook.model';
import { PaginationResponse, successResponse } from '../response';

export interface CreateDayHandler
  extends RequestHandler<
    unknown,
    successResponse<{ data: Ibirthday }>,
    Pick<Ibirthday, 'cover' | 'price' | 'title' | 'type'>,
    unknown
  > {}

export interface UpdateDayHandler
  extends RequestHandler<
    { dayId: string },
    successResponse<{ data: Ibirthday }>,
    Partial<Pick<Ibirthday, 'cover' | 'price' | 'title' | 'type'>>,
    unknown
  > {}

export interface GetDayHandler
  extends RequestHandler<
    { dayId: string },
    successResponse<{ data: Ibirthday }>,
    unknown,
    unknown
  > {}

export interface GetDaysHandler
  extends RequestHandler<unknown, PaginationResponse<{ data: Ibirthday[] }>, unknown, unknown> {}

export interface DeleteDayHandler
  extends RequestHandler<{ dayId: string }, successResponse, unknown, unknown> {}

export interface DayBookHandler
  extends RequestHandler<
    unknown,
    successResponse<{ data: IdayBook }>,
    Pick<
      IdayBook,
      | 'startDate'
      | 'endDate'
      | 'products'
      | 'totalPrice'
      | 'user'
      | 'stuffDiscount'
      | 'pointDiscount'
    >,
    unknown
  > {}
export interface UpdateDayBookHandler
  extends RequestHandler<
    { bookId: string },
    successResponse<{ data: IdayBook }>,
    Pick<IdayBook, 'startDate' | 'endDate' | 'voucher' | 'totalPrice' | 'status'>,
    unknown
  > {}

export interface GetUserBookingHandler
  extends RequestHandler<unknown, successResponse<{ data: IdayBook[] }>, unknown, unknown> {}

export interface GetAllBookingHandler
  extends RequestHandler<unknown, PaginationResponse<{ data: IdayBook[] }>, unknown, unknown> {}

export interface GetDayBookHandler
  extends RequestHandler<
    { bookId: string },
    successResponse<{ data: IdayBook }>,
    unknown,
    unknown
  > {}

export interface UpdateDayBookPaymentHandler
  extends RequestHandler<{ bookId: string }, successResponse, unknown, unknown> {}
