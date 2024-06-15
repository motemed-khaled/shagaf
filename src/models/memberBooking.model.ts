/* eslint-disable @typescript-eslint/ban-types */
import { Document, model, Schema, Types } from 'mongoose';

import { AuditLog } from './bookingLog.schema';
import { Imember } from './members.model';
import { Ioffer } from './offers.model';
import { Iusers } from './user.model';
import { MODELS } from '../types/modelsName';


export interface ImemberBooking extends Document  {
    member: Types.ObjectId | Imember;
    user: Types.ObjectId | Iusers;
    voucher:Types.ObjectId | Ioffer;
    start: Date;
    end:Date;
    paid: boolean;
    totalPrice:number;
    pointDiscount:number;
    stuffDiscount:number;
}

const memberBookingSchema = new Schema<ImemberBooking>({
  member: { type: Schema.Types.ObjectId, ref: MODELS.member },
  user: { type: Schema.Types.ObjectId, ref: MODELS.user },
  paid: { type: Boolean, default: false },
  totalPrice:{type:Number , default:0},
  pointDiscount:{type:Number , default:0},
  stuffDiscount:{type:Number , default:0},
  start: Date,
  end: Date,
}, { timestamps: true, collection: MODELS.memberBooking });

type Details = {
  [key: string]: any;
};

memberBookingSchema.pre('save', async function (next) {
  if (this.isNew) {
    await AuditLog.create({
      user: this.user,
      action: 'create',
      targetModel: MODELS.memberBooking,
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
      targetModel: MODELS.memberBooking,
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
        targetModel: MODELS.memberBooking,
        targetId: docToDelete._id
      });
    }
  } catch (error) {
    return next(error);
  }
  next();
}

memberBookingSchema.pre('findOneAndDelete', logDelete);

export const MemberBooking = model<ImemberBooking>(MODELS.memberBooking, memberBookingSchema);
