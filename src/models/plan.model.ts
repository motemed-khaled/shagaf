import { model, Schema } from 'mongoose';

import { MODELS } from '../types/modelsName';

export enum PlanTypes {
  shared = 'shared',
  private = 'private',
  birthDay = 'birthDay',
}

export interface IPlan {
  type: PlanTypes;
  shared: { hourOne: number; hourTwo: number; hourThree: number; hourFour: number };
  private: { price: number };
  birthDay: { price: number };
  icon: string;
  title: string;
}

export const Plan = model<IPlan>(
  MODELS.plan,
  new Schema<IPlan>(
    {
      type: { type: String, enum: PlanTypes },
      shared: {
        hourOne: { type: Number, default: 0 },
        hourTwo: { type: Number, default: 0 },
        hourThree: { type: Number, default: 0 },
        hourFour: { type: Number, default: 0 },
      },
      private: { price: { type: Number, default: 0 } },
      birthDay: { price: { type: Number, default: 0 } },
      icon: { type: String, default: null },
      title: { type: String, default: null },
    },
    { timestamps: true, collection: MODELS.plan },
  ),
);
