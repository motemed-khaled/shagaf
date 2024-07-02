
import { app } from './app';
import { dbConnection } from './config/database_connection';
import { checkEnvVariables, env } from './config/env';
import { startCronJob } from './corn/member.corn';

const start = async () => {
  checkEnvVariables();
  await dbConnection();
  startCronJob();
  app.listen(env.port, () => {
    console.log(`server listen in port... : ${env.port}`);
  });

};

start();
