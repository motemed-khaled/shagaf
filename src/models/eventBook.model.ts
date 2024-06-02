/* eslint-disable @typescript-eslint/ban-types */

import { model, Schema, Types, Document } from 'mongoose';

import { AuditLog } from './bookingLog.schema';
import { Ievent } from './event.model';
import { Ioffer } from './offers.model';
import { Iusers } from './user.model';
import { MODELS } from '../types/modelsName';

export interface IeventBook extends Document {
  user: Types.ObjectId | Iusers;
  event: Types.ObjectId | Ievent;
  voucher: Types.ObjectId | Ioffer;
  totalPrice: number;
  date: Date;
  paid: boolean;
  pointDiscount:number;
  stuffDiscount:number;
}

const EventBookSchema = new Schema<IeventBook>({
  user: { type: Schema.Types.ObjectId, ref: MODELS.user, required: true },
  event: { type: Schema.Types.ObjectId, ref: MODELS.event, required: true },
  totalPrice: { type: Number, default: 0 },
  paid: { type: Boolean, default: false },
  date: { type: Date, required: true },
  pointDiscount:{type:Number , default:0},
  stuffDiscount:{type:Number , default:0}
}, { timestamps: true, collection: MODELS.eventBook });

type Details = {
  [key: string]: any;
};

EventBookSchema.pre('save', async function (next) {
  if (this.isNew) {
    await AuditLog.create({
      user: this.user,
      action: 'create',
      targetModel: MODELS.eventBook,
      targetId: this._id,
      details: this.toObject()
    });
  } else {
    const modifiedFields = this.modifiedPaths();
    const details: Details = {}; // Using the Details type

    modifiedFields.forEach(field => {
      details[field] = this.get(field);
    });

    await AuditLog.create({
      user: this.user,
      action: 'update',
      targetModel: MODELS.eventBook,
      targetId: this._id,
      details
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
        targetModel: MODELS.eventBook,
        targetId: docToDelete._id
      });
    }
  } catch (error) {
    return next(error);
  }
  next();
}

EventBookSchema.pre('findOneAndDelete', logDelete);

export const EventBook = model<IeventBook>(MODELS.eventBook, EventBookSchema);
