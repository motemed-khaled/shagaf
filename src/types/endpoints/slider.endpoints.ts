import { RequestHandler } from 'express';

import { ISlider } from '../../models/slider.model';
import { successResponse } from '../response';






export interface CreateSliderHandler
extends RequestHandler<unknown , successResponse<{data:ISlider}> , Pick<ISlider , 'cover'|'location'|'rate'|'title'> , unknown>{}

export interface UpdateSliderHandler
extends RequestHandler<{sliderId:string} , successResponse<{data:ISlider}> , Partial<Pick<ISlider , 'cover' | 'location' | 'rate' |'title'>> , unknown>{}

export interface GetSliderHandler
extends RequestHandler<{sliderId:string} , successResponse<{data:ISlider}> , unknown , unknown>{}

export interface GetSlidersHandler
extends RequestHandler<unknown , successResponse<{data:ISlider[]}> , unknown , unknown>{}

export interface DeleteSliderHandler
extends RequestHandler<{sliderId:string} , successResponse , unknown , unknown>{}