
import {  model, Schema } from 'mongoose';

import { MODELS } from '../types/modelsName';




export interface Iadvertisment{
    cover:string
}


export const Advertisement = model<Iadvertisment>(MODELS.advertisement , new Schema<Iadvertisment>({
  cover:String
},{timestamps:true , collection:MODELS.advertisement}));