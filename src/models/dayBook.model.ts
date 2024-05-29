import { model, Schema, Types } from 'mongoose';

import { Ibirthday } from './birthDay.model';
import { Ioffer } from './offers.model';
import { Iusers } from './user.model';
import { MODELS } from '../types/modelsName';




export interface IdayBook{
    user:Types.ObjectId  | Iusers;
    voucher:Types.ObjectId|Ioffer;
    products:{product:Types.ObjectId | Ibirthday , count:number}[]
    startDate:Date;
    endDate:Date;
    totalPrice:number;
    cancellationDate:Date;
    paid:boolean
}


export const DayBook = model<IdayBook>(MODELS.dayBook , new Schema<IdayBook>({
  user:{type:Schema.Types.ObjectId , ref:MODELS.user},
  voucher:{type:Schema.Types.ObjectId , ref:MODELS.offer},
  products:[{product:{type:Schema.Types.ObjectId , ref:MODELS.birthDay} , count:{type:Number , default:1}}],
  totalPrice:{type:Number , default:0},
  paid:{type:Boolean , default:false},
  startDate:Date,
  endDate:Date,
  cancellationDate:Date
},{timestamps:true , collection:MODELS.dayBook}));