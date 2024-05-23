import bcrypt from 'bcryptjs';

import { env } from '../config/env';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, env.bcrypt.salt);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
