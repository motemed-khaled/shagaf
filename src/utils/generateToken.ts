import jwt from 'jsonwebtoken';

import { env } from '../config/env';
import { IjwtPayload } from '../types/jwt';


export const generateToken = (option: IjwtPayload) => {
  return jwt.sign(option, env.jwt.secret);
};
