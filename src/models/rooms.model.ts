import { model, Schema, Types } from 'mongoose';

import { Ilocation } from './location.model';
import { IPackage } from './package.model';
import { IPlan } from './plan.model';
import { MODELS } from '../types/modelsName';

export interface Iroom {
  cover: string;
  attachments: string[];
  title: string;
  description: string;
  seatsNum: number;
  seatsAvailable: number;
  location: Types.ObjectId | Ilocation;
  plans: Types.ObjectId[] | IPlan[];
  packages: Types.ObjectId[] | IPackage[];
  birthDay: boolean;
  amenities: {
    image: string;
    title: string;
  }[];
}

export const Room = model<Iroom>(
  MODELS.room,
  new Schema<Iroom>(
    {
      cover: {
        type: String,
        default: null,
      },
      attachments: [String],
      title: {
        type: String,
        default: null,
      },
      description: {
        type: String,
        default: null,
      },
      seatsNum: {
        type: Number,
        default: 0,
      },
      seatsAvailable: {
        type: Number,
        default: 0,
      },
      location: { type: Schema.Types.ObjectId, ref: MODELS.location },
      plans: [
        {
          type: Schema.Types.ObjectId,
          ref: MODELS.plan,
        },
      ],
      packages: [{ type: Schema.Types.ObjectId, ref: MODELS.package }],
      amenities: [
        {
          image: {
            type: String,
            default: null,
          },
          title: {
            type: String,
            default: null,
          },
        },
      ],
      birthDay: { type: Boolean, default: false },
    },
    { timestamps: true, collection: MODELS.room },
  ),
);
