import { model, Schema } from 'mongoose';

import { MODELS } from '../types/modelsName';




export interface Ibirthday{
cover:string,
title:string,
price:number,
type:'cake' | 'decoration' | 'session'
}


export const BirthDay = model<Ibirthday>(MODELS.birthDay , new Schema<Ibirthday>({
  cover:{type:String , default:null},
  title:{type:String , default:null},
  price:{type:Number , default:0},
  type:{type:String , enum:['cake' , 'decoration' , 'session']}
},{timestamps:true , collection:MODELS.birthDay}));