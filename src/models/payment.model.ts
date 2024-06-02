import { Schema, model, Document, Types } from 'mongoose';

import { Ioffer } from './offers.model';
import { MODELS } from '../types/modelsName';

enum PaymentType {
    dayBook = 'dayBook',
    eventBook = 'eventBook',
    memberBook = 'memberBook',
    roomBooking = 'roomBooking'
}

interface IPayment extends Document {
    voucher:Types.ObjectId | Ioffer;
  orderId: string;
  bookType:PaymentType;
  amount: number;
  currency: string;
  status: string;
  paymentUrl: string;
}

const PaymentSchema = new Schema<IPayment>({
  orderId: { type: String, required: true, unique: true },
  voucher:{type:Schema.Types.ObjectId , ref:MODELS.offer},
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, required: true },
  paymentUrl: { type: String, required: true },
  bookType:{type:String}
}, { timestamps: true , collection: MODELS.payment });

export const Payment = model<IPayment>(MODELS.payment, PaymentSchema);
