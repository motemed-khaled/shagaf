import { RequestHandler } from 'express';

import { ISetting } from '../../models/settings.models';
import { successResponse } from '../response';



export interface UpdateSettingHandler
extends RequestHandler<{settingId:string} , successResponse<{data:ISetting}> , Pick<ISetting , 'sharedRoomPlan'> , unknown>{}

export interface GetSettingHandler
extends RequestHandler<unknown , successResponse<{data:ISetting}> , unknown , unknown>{}
