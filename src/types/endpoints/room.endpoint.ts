import { RequestHandler } from 'express';

import { IroomBooking } from '../../models/roomBooking.model';
import { Iroom } from '../../models/rooms.model';
import { PaginationResponse, successResponse } from '../response';



export interface CreateRoomHandler
extends RequestHandler<unknown , successResponse<{data:Iroom}> , Partial<Pick<Iroom , 'attachments' | 'cover' | 'location' | 'description' | 'seatsNum' | 'plans' | 'title' | 'type'>> , unknown>{}

export interface UpdateRoomHandler
extends RequestHandler<{roomId:string} , successResponse<{data:Iroom}> , Partial<Pick<Iroom , 'attachments' | 'cover' | 'location' | 'description' | 'seatsNum' | 'plans' | 'title' | 'type'>> , unknown>{}

export interface GetRoomHandler
extends RequestHandler<{roomId:string} , successResponse<{data:Iroom}> , unknown , unknown>{}

export interface GetRoomsHandler
extends RequestHandler<unknown , PaginationResponse<{data:Iroom[]}> , unknown , unknown>{}

export interface DeleteRoomHandler
extends RequestHandler<{roomId:string} , successResponse , unknown , unknown>{}



export interface AddAmenitiesHandler
extends RequestHandler<{roomId:string} , successResponse<{data:Iroom}> , {title:string} , unknown>{}

export interface UpdateAmenitiesHandler
extends RequestHandler<{roomId:string} , successResponse<{data:Iroom}> , Partial<{amenityId:string , attachments?:string , title?:string}> , unknown>{}

export interface DeleteAmenitiesHandler
extends RequestHandler<{roomId:string} , successResponse , {amenityId:string} , unknown>{}




export interface UpdateAttachmentsHandler
extends RequestHandler<{roomId:string} , successResponse<{data:Iroom}> , {attachId:string} , unknown>{}

export interface DeleteAttachmentHandler
extends RequestHandler<{roomId:string} , successResponse , {attachId:string} , unknown>{}

export interface AddAttachmentHandler
extends RequestHandler<{roomId:string} , successResponse<{data:Iroom}> , Partial<Pick<Iroom , 'attachments'>> , unknown>{}


export interface BookRoomHandler
extends RequestHandler<unknown , successResponse<{data:IroomBooking}> , Pick<IroomBooking , 'startDate' | 'endDate' | 'seatCount' | 'room' | 'plan' | 'user'> , unknown>{}

export interface UpdateRoomBookHandler
extends RequestHandler<{bookId:string} , successResponse<{data:IroomBooking}> , Pick<IroomBooking , 'startDate' | 'endDate' | 'seatCount'> , unknown>{}

export interface GetUserBookingHandler
extends RequestHandler<unknown , successResponse<{data:IroomBooking[]}> , unknown , unknown>{}

export interface GetBookHandler
extends RequestHandler<{bookId:string} , successResponse<{data:IroomBooking}> , unknown , unknown>{}

export interface GetAllBookingHandler
extends RequestHandler<unknown , PaginationResponse<{data:IroomBooking[]}> , unknown , unknown>{}

export interface AddCoffeeToBookingHandler
extends RequestHandler<{bookId:string} , successResponse<{data:IroomBooking}> , Pick<IroomBooking , 'coffee'> , unknown>{}

export interface UpdateCoffeeToBookingHandler
extends RequestHandler<{bookId:string} , successResponse<{data:IroomBooking}> , {coffeeId:string , count:number} , unknown>{}

export interface AddExtraTimeHandler
extends RequestHandler<{bookId:string}, successResponse<{data:IroomBooking}> , {extraTimeTo:Date , extraTimeFrom:Date} , unknown>{}


export interface UpdatePaymentHandler
extends RequestHandler<{bookId:string} , successResponse , Partial<Pick<IroomBooking , 'coffeePaid' | 'reservationPaid' | 'extraPaid'>> , unknown>{}