import { model, Schema, Types } from 'mongoose';

import { MODELS } from '../types/modelsName';




export interface Ioffer{
    cover:string;
    title:string;
    name:string;
    discount:number;
    bookingNum:number;
    from:Date;
    to:Date;
    users:Types.ObjectId[]
}


export const Offer = model<Ioffer>(MODELS.offer , new Schema<Ioffer>({
  cover:{
    type:String,
    default:null
  },
  title:{
    type:String,
    default:null
  },
  name:{
    type:String,
    default:null
  },
  discount:{
    type:Number,
    default:0
  },
  bookingNum:{
    type:Number,
    default:1
  },
  from:Date,
  to:Date,
  users:[{
    type:Schema.Types.ObjectId,
    ref:MODELS.user
  }]
} , {timestamps:true , collection:MODELS.offer}));