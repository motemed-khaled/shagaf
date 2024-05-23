
import { app } from './app';
import { dbConnection } from './config/database_connection';
import { checkEnvVariables, env } from './config/env';

const start = async () => {
  checkEnvVariables();
  await dbConnection();
  app.listen(env.port, () => {
    console.log(`server listen in port... : ${env.port}`);
  });

};

start();
