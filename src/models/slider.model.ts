import { model, Schema } from 'mongoose';

import { MODELS } from '../types/modelsName';



export interface ISlider {
    location:'roxy'|'new cairo',
    title:string,
    rate:number,
    cover:string
}


export const Slider = model<ISlider>(MODELS.slider , new Schema<ISlider>({
  location:{
    type:String,
    enum:['roxy','new cairo']
  },
  title:{
    type:String,
    default:null
  },
  rate:{
    type:Number,
    default:0
  },
  cover:{
    type:String,
    default:null
  }
},{timestamps:true , collection:MODELS.slider}));