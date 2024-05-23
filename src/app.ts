
import cors from 'cors';
import express from 'express';

import { globalErrorHandlingMiddleware } from './middlewares/global-error-handling.middleware';
import { mountRoutes } from './routes/index';

export const app = express();

app.use(
  cors({
    origin: '*',
  }),
);

app.set('trust proxy', true);
app.use(express.json());
app.use('/media', express.static('media'));

mountRoutes(app);

app.use(globalErrorHandlingMiddleware);
