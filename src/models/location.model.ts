import { model, Schema } from 'mongoose';

import { MODELS } from '../types/modelsName';


export interface Ilocation {
    name:string;
}


export const Location = model(MODELS.location , new Schema<Ilocation>({
  name:{type:String , default:null , unique:true}
},{timestamps:true , collection:MODELS.location}));