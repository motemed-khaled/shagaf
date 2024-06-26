import { RequestHandler } from 'express';

/* eslint-disable @typescript-eslint/no-namespace */


import { Iusers } from '../../models/user.model';
import { IjwtPayload, Ipagination } from '../jwt';
import { PaginationResponse, successResponse } from '../response';



declare global {
    namespace Express {
      interface Request {
        loggedUser?: IjwtPayload;
        pagination: Ipagination;
      }
    }
  }


export interface SignUpHandler
extends RequestHandler<unknown , successResponse , Pick<Iusers , 'birthdate' | 'phone' | 'username' | 'password' | 'email'> , unknown>{}

export interface SigInHandler
extends RequestHandler<unknown , successResponse<{data:Iusers}> , Pick<Iusers , 'email' | 'password'> , unknown >{}

export interface VerifyUserHandler
extends RequestHandler<unknown , successResponse<{email:string , reason:string}> , {code:string , email:string} , unknown>{}

export interface AskForgetPasswordHandler
extends RequestHandler<unknown , successResponse , {email:string} , unknown>{}

export interface UpdatePasswordHandler
extends RequestHandler<unknown , successResponse , {newPassword:string , email:string} , unknown>{}

export interface ChangePasswordHandler
extends RequestHandler<unknown , successResponse , {oldPassword:string , newPassword:string} , unknown>{}

export interface AskUpdateEmailHandler
extends RequestHandler<unknown , successResponse , unknown , unknown>{}

export interface UpdateEmailHandler
extends RequestHandler<unknown , successResponse , {newEmail:string} , unknown>{}


export interface UpdateLoggedUserHandler
extends RequestHandler<unknown , successResponse<{data:Iusers}> , Pick<Iusers , 'birthdate' | 'phone' | 'username'> , unknown>{}

export interface GetLoggedUserHandler
extends RequestHandler<unknown , successResponse<{data:Iusers}> , unknown , unknown>{}

export interface ResendVerificationCodeHandler
extends RequestHandler<unknown , successResponse , {email:string} , unknown>{}

export interface GetAllUsersHandler
extends RequestHandler<unknown , PaginationResponse<{data:Iusers[]}> , unknown , unknown>{}

export interface CreateUserHandler
extends RequestHandler<unknown , successResponse<{data:Iusers}> , Pick<Iusers , 'birthdate' | 'phone' | 'username' | 'password' | 'email' | 'userType'> , unknown >{}

export interface UpdateUserHandler
extends RequestHandler<{userId:string} , successResponse<{data:Iusers}> , Partial<Pick<Iusers , 'birthdate' | 'phone' | 'username' | 'password' | 'email' | 'userType'>> , unknown >{}

export interface DeleteUserHandler
extends RequestHandler<{userId:string} , successResponse , unknown , unknown>{}

export interface GetUserPointsDiscountHandler 
extends RequestHandler<{userId:string} , successResponse<{data:{discount:number}}> , unknown , unknown>{}

export interface GetUserHandler
extends RequestHandler<{userId:string} , successResponse<{data:Iusers}> , unknown , unknown>{}