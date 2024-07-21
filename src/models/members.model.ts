import { model, Schema } from 'mongoose';

import { MODELS } from '../types/modelsName';

export interface Imember {
  title: string;
  details: { title: string }[];
  price: number;
  duration: number;
  durationType: 'Day' | 'Month' | 'Year';
}

export const Member = model<Imember>(
  MODELS.member,
  new Schema<Imember>(
    {
      title: { type: String, default: null },
      details: [{ title: { type: String, default: null } }],
      price: { type: Number, default: null },
      duration: { type: Number, default: 0 },
      durationType: { type: String, enum: ['Day', 'Month', 'Year'] },
    },
    { timestamps: true, collection: MODELS.member },
  ),
);
