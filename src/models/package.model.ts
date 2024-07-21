import { model, Schema, Types } from 'mongoose';

import { Iproduct } from './product.model';
import { MODELS } from '../types/modelsName';

export interface IPackage {
  title: string;
  price: number;
  duration: number;
  products: { product: Types.ObjectId | Iproduct; count: number }[];
  extraPrice: number;
}

export const Package = model<IPackage>(
  MODELS.package,
  new Schema<IPackage>(
    {
      title: { type: String, default: null, unique: true, sparse: true },
      duration: { type: Number, default: 0 },
      extraPrice: { type: Number, default: 0 },
      price: { type: Number, default: 0 },
      products: [
        {
          product: { type: Schema.Types.ObjectId, ref: MODELS.product },
          count: { type: Number, default: 1 },
        },
      ],
    },
    { timestamps: true, collection: MODELS.package },
  ),
);
