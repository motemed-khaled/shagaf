import { model, Schema, Types } from 'mongoose';

import { Ievent } from './event.model';
import { Iusers } from './user.model';
import { MODELS } from '../types/modelsName';


export interface IeventBook{
    user:Types.ObjectId | Iusers;
    event:Types.ObjectId | Ievent;
    totalPrice:number;
    date:Date;
}

export const EventBook = model<IeventBook>(MODELS.eventBook , new Schema<IeventBook>({
  user:{type:Schema.Types.ObjectId , ref:MODELS.user},
  event:{type:Schema.Types.ObjectId , ref:MODELS.event},
  totalPrice:{type:Number , default:0},
  date:Date
},{timestamps:true , collection:MODELS.eventBook}));