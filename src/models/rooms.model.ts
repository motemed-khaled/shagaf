import {  model, Schema, Types } from 'mongoose';

import { Iplan } from './plan.model';
import { MODELS } from '../types/modelsName';



export interface Iroom {
    cover:string,
    attachments:{image:string}[],
    title:string,
    description:string,
    seatsNum:number,
    seatsAvailable:number,
    location:'roxy'|'new cairo',
    plans:Types.ObjectId[] | Iplan[]
    type: 'shared' | 'private',
    amenities:{
        image:string,
        title:string
    }[],
}

export const Room = model<Iroom>(MODELS.room , new Schema<Iroom>({
  cover:{
    type:String,
    default:null
  },
  attachments:[{image:String}],
  title:{
    type:String,
    default:null
  },
  description:{
    type:String,
    default:null
  },
  seatsNum:{
    type:Number,
    default:0
  },
  seatsAvailable:{
    type:Number,
    default:0
  },
  location:{
    type:String,
    enum:['roxy','new cairo']
  },
  plans:[{
    type:Schema.Types.ObjectId,
    ref:MODELS.plan
  }],
  type:{
    type:String,
    enum:['shared' , 'private'],
    default:'shared'
  },
  amenities:[{
    image:{
      type:String,
      default:null
    },
    title:{
      type:String,
      default:null
    }
  }]
},{timestamps:true , collection:MODELS.room}));