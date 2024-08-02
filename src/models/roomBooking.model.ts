import { model, Schema, Types } from 'mongoose';

import { IPackage } from './package.model';
import { IPlan } from './plan.model';
import { Iproduct } from './product.model';
import { Iroom } from './rooms.model';
import { Iusers } from './user.model';
import { MODELS } from '../types/modelsName';

export enum ReservationPaidType {
  card = 'card',
  cash = 'cash',
}

export enum ReservationType {
  shared = 'shared',
  private = 'private',
  birthDay = 'birthDay',
}

export interface IRoomBooking {
  user: Types.ObjectId | Iusers;
  room: Types.ObjectId | Iroom;
  plan: Types.ObjectId | IPlan | null;
  package: Types.ObjectId | IPackage | null;
  products: [{ product: Types.ObjectId | Iproduct; free: boolean; count: number; price: number }];
  seatsCount: number;
  start: Date;
  end: Date;
  reservationPrice: number;
  productPrice: number;
  extraPrice: number;
  reservationPaid: boolean;
  reservationPaidType: ReservationPaidType;
  productPaid: boolean;
  extraPaid: boolean;
  reservationType: ReservationType;
  closed:boolean
}

export const RoomBooking = model<IRoomBooking>(
  MODELS.roomBooking,
  new Schema<IRoomBooking>(
    {
      user: { type: Schema.Types.ObjectId, ref: MODELS.user },
      room: { type: Schema.Types.ObjectId, ref: MODELS.room },
      plan: { type: Schema.Types.ObjectId, ref: MODELS.plan },
      package: { type: Schema.Types.ObjectId, ref: MODELS.package },
      products: [
        {
          product: { type: Schema.Types.ObjectId, ref: MODELS.product },
          free: { type: Boolean, default: false },
          count: { type: Number, default: 1 },
          price: { type: Number, default: 0 },
        },
      ],
      start: Date,
      end: Date,
      reservationPrice: { type: Number, default: 0 },
      productPrice: { type: Number, default: 0 },
      extraPrice: { type: Number, default: 0 },
      reservationPaid: { type: Boolean, default: false },
      reservationPaidType: { type: String, enum: ReservationPaidType },
      reservationType: { type: String, enum: ReservationType },
      productPaid: { type: Boolean, default: false },
      extraPaid: { type: Boolean, default: false },
      seatsCount: { type: Number, default: 0 },
      closed:{type:Boolean , default:false}
    },
    { timestamps: true, collection: MODELS.roomBooking },
  ),
);
