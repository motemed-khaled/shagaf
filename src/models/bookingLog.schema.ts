import { Schema, model, Document, Types } from 'mongoose';

import { Iusers } from './user.model';
import { MODELS } from '../types/modelsName';

export interface IAuditLog extends Document {
  user: Types.ObjectId | Iusers;
  action: string;
  targetModel: string;
  targetId: Types.ObjectId;
  timestamp: Date;
  details?: object;
}

const auditLogSchema = new Schema<IAuditLog>({
  user: { type: Schema.Types.ObjectId, ref: MODELS.user, required: true },
  action: { type: String, required: true },
  targetModel: { type: String, required: true },
  targetId: { type: Schema.Types.ObjectId, required: true },
  timestamp: { type: Date, default: Date.now },
  details: { type: Schema.Types.Mixed },
});

export const AuditLog = model<IAuditLog>(MODELS.auditLog, auditLogSchema);
