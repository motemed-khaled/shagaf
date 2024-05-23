import { model, Schema } from 'mongoose';

import { MODELS } from '../types/modelsName';



export interface Icategory{
    cover:string,
    title:string
}


export const Category = model<Icategory>(MODELS.category , new Schema<Icategory>({
  cover:{type:String , default : null},
  title:{type:String , default:null}
},{timestamps:true , collection:MODELS.category}));