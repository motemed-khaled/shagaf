/* eslint-disable @typescript-eslint/ban-types */
import { model, Schema, Types } from 'mongoose';

import { AuditLog } from './bookingLog.schema';
import { ImemberBooking } from './memberBooking.model';
import { Ioffer } from './offers.model';
import { Iplan } from './plan.model';
import { Iproduct } from './product.model';
import { Iroom } from './rooms.model';
import { Iusers } from './user.model';
import { MODELS } from '../types/modelsName';


export interface IroomBooking{
    user:Types.ObjectId | Iusers;
    room:Types.ObjectId | Iroom;
    plan:Types.ObjectId | Iplan;
    member:Types.ObjectId | ImemberBooking;
    voucher:Types.ObjectId | Ioffer;
    reservationPrice:number;
    startDate:Date;
    endDate:Date;
    seatCount:number;
    totalPrice:number;
    coffee:{product: Types.ObjectId | Iproduct , count:number}[];
    coffeePrice:number;
    cancellationDate:Date;
    reservationPaid:boolean;
    extraPaid:boolean;
    coffeePaid:boolean;
    extraTimeFrom:Date;
    extraPrice:number;
    extraTimeTo:Date;
    pointDiscount:number;
    stuffDiscount:number;
}


export const RoomBookingSchema =  new Schema<IroomBooking>({
  user:{type:Schema.Types.ObjectId , ref:MODELS.user},
  room:{type:Schema.Types.ObjectId , ref:MODELS.room},
  member:{type:Schema.Types.ObjectId , ref:MODELS.memberBooking},
  coffee:[{product:{type:Schema.Types.ObjectId , ref:MODELS.product} , count:{type:Number , default:1}}],
  plan:{type:Schema.Types.ObjectId , ref:MODELS.plan},
  voucher:{type:Schema.Types.ObjectId , ref:MODELS.offer},
  seatCount:{type:Number , default:1},
  totalPrice:{type:Number , default:0},
  reservationPaid:{type:Boolean , default:false},
  coffeePaid:{type:Boolean , default:false},
  extraPaid:{type:Boolean , default:false},
  coffeePrice:{type:Number , default:0},
  extraPrice:{type:Number , default:0},
  reservationPrice:{type:Number , default:0},
  extraTimeFrom:Date,
  extraTimeTo:Date,
  startDate:Date,
  endDate:Date,
  cancellationDate:Date
} , {timestamps:true , collection:MODELS.roomBooking});

type Details = {
  [key: string]: any;
};


RoomBookingSchema.pre('save', async function (next) {
  if (this.isNew) {
    await AuditLog.create({
      user: this.user,
      action: 'create',
      targetModel: MODELS.roomBooking,
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
      targetModel: MODELS.roomBooking,
      targetId: this._id,
      details
    });
  }
  next();
});

async function logDelete(this: any, next: Function) {
  const docToDelete = await this.model.findOne(this.getQuery());
  if (docToDelete) {
    await AuditLog.create({
      user: docToDelete.user,
      action: 'delete',
      targetModel: MODELS.roomBooking,
      targetId: docToDelete._id
    });
  }
  next();
}

RoomBookingSchema.pre('findOneAndDelete', logDelete);



export const RoomBooking = model<IroomBooking>(MODELS.roomBooking , RoomBookingSchema);