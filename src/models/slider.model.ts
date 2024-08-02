import { model, Schema, Types } from 'mongoose';

import { Ilocation } from './location.model';
import { MODELS } from '../types/modelsName';

export interface ISlider {
  location: Types.ObjectId | Ilocation;
  title: string;
  rate: number;
  cover: string;
}

export const Slider = model<ISlider>(
  MODELS.slider,
  new Schema<ISlider>(
    {
      location: {
        type: Schema.Types.ObjectId ,
        ref: MODELS.location,
      },
      title: {
        type: String,
        default: null,
      },
      rate: {
        type: Number,
        default: 0,
      },
      cover: {
        type: String,
        default: null,
      },
    },
    { timestamps: true, collection: MODELS.slider },
  ),
);
