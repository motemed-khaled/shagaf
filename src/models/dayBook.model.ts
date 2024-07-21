/* eslint-disable @typescript-eslint/ban-types */
import { model, Schema, Types, Document } from 'mongoose';

import { Ibirthday } from './birthDay.model';
import { AuditLog } from './bookingLog.schema'; // Ensure this path is correct
import { Ioffer } from './offers.model';
import { Iusers } from './user.model';
import { MODELS } from '../types/modelsName';

export interface IdayBook extends Document {
  user: Types.ObjectId | Iusers;
  voucher: Types.ObjectId | Ioffer;
  products: { product: Types.ObjectId | Ibirthday; count: number }[];
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  cancellationDate: Date;
  paid: boolean;
  pointDiscount: number;
  stuffDiscount: number;
  status: 'pending' | 'accepted' | 'rejected';
}

const DayBookSchema = new Schema<IdayBook>(
  {
    user: { type: Schema.Types.ObjectId, ref: MODELS.user },
    voucher: { type: Schema.Types.ObjectId, ref: MODELS.offer },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: MODELS.birthDay },
        count: { type: Number, default: 1 },
      },
    ],
    totalPrice: { type: Number, default: 0 },
    paid: { type: Boolean, default: false },
    startDate: { type: Date },
    endDate: { type: Date },
    cancellationDate: { type: Date },
    pointDiscount: { type: Number, default: 0 },
    stuffDiscount: { type: Number, default: 0 },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  },
  { timestamps: true, collection: MODELS.dayBook },
);

type Details = {
  [key: string]: any;
};

DayBookSchema.pre('save', async function (next) {
  if (this.isNew) {
    await AuditLog.create({
      user: this.user,
      action: 'create',
      targetModel: MODELS.dayBook,
      targetId: this._id,
      details: this.toObject(),
    });
  } else {
    const modifiedFields = this.modifiedPaths();
    const details: Details = {};

    modifiedFields.forEach((field) => {
      details[field] = this.get(field);
    });

    await AuditLog.create({
      user: this.user,
      action: 'update',
      targetModel: MODELS.dayBook,
      targetId: this._id,
      details,
    });
  }
  next();
});

async function logDelete(this: any, next: Function) {
  try {
    const docToDelete = await this.model.findOne(this.getQuery());
    if (docToDelete) {
      await AuditLog.create({
        user: docToDelete.user,
        action: 'delete',
        targetModel: MODELS.dayBook,
        targetId: docToDelete._id,
      });
    }
  } catch (error) {
    return next(error);
  }
  next();
}

DayBookSchema.pre('findOneAndDelete', logDelete);

export const DayBook = model<IdayBook>(MODELS.dayBook, DayBookSchema);
