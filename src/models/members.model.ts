import { model, Schema } from 'mongoose';

import { MODELS } from '../types/modelsName';


export enum MemberDurationType {
  day = 'Day',
  month = 'Month'
}

export enum MemberType{
  separated = 'separated',
  continuos = 'continuos'
}
export interface Imember {
  title: string;
  details: { title: string }[];
  price: number;
  duration: number;
  durationType: MemberDurationType;
  type:MemberType;
  end:Date
}

export const Member = model<Imember>(
  MODELS.member,
  new Schema<Imember>(
    {
      title: { type: String, default: null },
      details: [{ title: { type: String, default: null } }],
      price: { type: Number, default: null },
      duration: { type: Number, default: 0 },
      durationType: { type: String, enum: MemberDurationType },
      type:{type:String , enum:MemberType},
      end:Date
    },
    { timestamps: true, collection: MODELS.member },
  ),
);
