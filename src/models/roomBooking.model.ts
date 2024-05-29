import { model, Schema, Types } from 'mongoose';

import { Iplan } from './plan.model';
import { Iproduct } from './product.model';
import { Iroom } from './rooms.model';
import { Iusers } from './user.model';
import { MODELS } from '../types/modelsName';


export interface IroomBooking{
    user:Types.ObjectId | Iusers;
    room:Types.ObjectId | Iroom;
    plan:Types.ObjectId | Iplan;
    reservationPrice:number;
    voucher:number;
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
}


export const RoomBooking = model<IroomBooking>(MODELS.roomBooking , new Schema<IroomBooking>({
  user:{type:Schema.Types.ObjectId , ref:MODELS.user},
  room:{type:Schema.Types.ObjectId , ref:MODELS.room},
  coffee:[{product:{type:Schema.Types.ObjectId , ref:MODELS.product} , count:{type:Number , default:1}}],
  plan:{type:Schema.Types.ObjectId , ref:MODELS.plan},
  voucher:{type:Number , default:0},
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
} , {timestamps:true , collection:MODELS.roomBooking}));