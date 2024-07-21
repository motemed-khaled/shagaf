import { model, Schema } from 'mongoose';

import { MODELS } from '../types/modelsName';




export interface ISetting {
    sharedRoomPlan:boolean;
}



export const Setting = model<ISetting>(MODELS.setting , new Schema<ISetting>({
  sharedRoomPlan:{type:Boolean , default:false}
},{timestamps:true , collection:MODELS.setting}));