import { model, Schema } from 'mongoose';

import { MODELS } from '../types/modelsName';

export interface Ievent {
  cover: string;
  title: string;
  location: string;
  cost: number;
  details: { title: string }[];
  date: Date;
}

export const Event = model<Ievent>(
  MODELS.event,
  new Schema<Ievent>(
    {
      cover: { type: String, default: null },
      title: { type: String, default: null },
      location: { type: String, default: null },
      cost: { type: Number, default: null },
      details: [{ title: { type: String, default: null } }],
      date: { type: Date, default: null },
    },
    { timestamps: true, collection: MODELS.event },
  ),
);
