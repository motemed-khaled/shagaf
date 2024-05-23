import { model, Schema } from 'mongoose';

import { MODELS } from '../types/modelsName';
import { hashPassword } from '../utils/bcrypt';


export enum VerificationReason {
  updateOldEmai = 'update-old-email',
  updateOldEmailVerified = 'update-old-email-verified',
  updateNewEmail = 'update-new-phone-number',
  verifyUpdatedPhoneNumber = 'verify-updated-phone-number',
  forgetPassword = 'forget-password',
  forgetPasswordVerified = 'forget-password-verified',
  signup = 'signup',

}

export interface Iusers{
    username:string,
    email:string,
    phone:string,
    password:string,
    birthdate:Date,
    token?:string,
    verificationCode?: {
      code?: string,
      expireAt?: string,
      reason?: VerificationReason
    },
    isVerified:boolean
}

const userSchema =  new Schema<Iusers>({
  username:{type:String , trim:true },
  email:{type:String , unique:true},
  phone:{type:String , unique:true},
  password:{type:String , select:false},
  token:String,
  verificationCode: { code: String, expireAt: Date, reason: { type: String, default: null } },
  isVerified:{
    type:Boolean,
    default:false
  }, 
  birthdate:Date
},{timestamps:true , collection:MODELS.user});


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await hashPassword(this.password);
  next();
});

export const Users = model<Iusers>(MODELS.user , userSchema);