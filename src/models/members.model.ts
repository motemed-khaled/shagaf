import { model, Schema } from 'mongoose';

import { MODELS } from '../types/modelsName';



export interface Imember {
    title:string,
    details:{title:string}[],
    price:number
}


export const Member = model<Imember>(MODELS.member , new Schema<Imember>({
  title:{type:String , default:null},
  details:[{title:{type:String , default:null}}],
  price:{type:Number , default:null}
},{timestamps:true , collection:MODELS.member}));