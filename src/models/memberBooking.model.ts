import { Types } from 'mongoose';

import { Imember } from './members.model';
import { Iusers } from './user.model';



export interface ImemberBooking{
    member:Types.ObjectId | Imember;
    user:Types.ObjectId | Iusers;
}