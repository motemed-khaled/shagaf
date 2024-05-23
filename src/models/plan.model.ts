import { model, Schema } from 'mongoose';

import { MODELS } from '../types/modelsName';




export interface Iplan{
    icon:string,
    price:number,
    stamp:'Hour' | 'Day' | 'Month'
}


export const Plan = model<Iplan>(MODELS.plan , new Schema<Iplan>({
  icon:{
    type:String,
    default:null
  },
  price:{
    type:Number,
    default:null
  },
  stamp:{
    type:String,
    enum:['Hour' , 'Day' , 'Month'],
    default:'Day'
  }
},{timestamps:true , collection:MODELS.plan}));