import { model, Schema } from 'mongoose';

import { MODELS } from '../types/modelsName';

export interface Ilocation {
  name: string;
  location: { lat: number; lng: number };
}

export const Location = model(
  MODELS.location,
  new Schema<Ilocation>(
    {
      name: { type: String, default: null, unique: true },
      location: { lat: { type: Number, default: 0 }, lng: { type: Number, default: 0 } },
    },
    { timestamps: true, collection: MODELS.location },
  ),
);
