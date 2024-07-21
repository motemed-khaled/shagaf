import { model, Schema, Types } from 'mongoose';

import { Icategory } from './category.model';
import { MODELS } from '../types/modelsName';

export interface Iproduct {
  title: string;
  price: number;
  cover: string;
  count: number;
  category: Types.ObjectId | Icategory;
}

export const Product = model<Iproduct>(
  MODELS.product,
  new Schema<Iproduct>(
    {
      category: { type: Schema.Types.ObjectId, ref: MODELS.category },
      price: { type: Number, default: 0 },
      title: { type: String, default: null },
      count: { type: Number, default: 0 },
      cover: { type: String, default: null },
    },
    { timestamps: true, collection: MODELS.product },
  ),
);
