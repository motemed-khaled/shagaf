import { config } from 'dotenv';

config();

export const env = {
  port: +(process.env.PORT || 3000) as number,
  environment: process.env.NODE_ENV || 'development',
  mongoDb: {
    uri: process.env.MONGO_URI as string,
  },
  bcrypt: {
    salt: +(process.env.BCRYPT_SALT || 10) as number,
    paper: (process.env.BCRYPT_PAPER || 'password') as string,
  },
  jwt: {
    secret: process.env.JWT_KEY as string,
  },
  key:{
    apikey:process.env.API_KEY
  },
  payment:{
    baseUrl : process.env.PAYMENT_BASE_URL as string,
    apiSecret : process.env.PAYMENT_API_SECRET as string,
    apiKey : process.env.PAYMENT_API_KEY as string,
    apiCookie : process.env.PAYMENT_API_COOKIE as string,
    marchent_id : process.env.MARCHENT_ID as string
  }
};

export const checkEnvVariables = () => {
  if (!env.mongoDb.uri) throw new Error('env:MONGO_URI must be defined');
  if (!env.jwt.secret) throw new Error('env:JWT_KEY must be defined');
  // if (!env.payment.baseUrl) throw new Error('env:PAYMENT_BASE_URL must be defined');
  // if (!env.payment.apiSecret) throw new Error('env:PAYMENT_API_SECRET must be defined');
  // if (!env.payment.apiKey) throw new Error('env:PAYMENT_API_KEY must be defined');
  // if (!env.payment.apiCookie) throw new Error('env:PAYMENT_API_COOKIE must be defined');
  // if (!env.payment.marchent_id) throw new Error('env:MARCHENT_ID must be defined');
};
