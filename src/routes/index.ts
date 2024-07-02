import { Application } from 'express';

import { router as addRouter } from './add.routes';
import { router as birthDayRouter } from './birtDay.routes';
import { router as categoriesRouter } from './category.routes';
import { router as eventRoutes } from './event.routes';
import { router as locationRouter } from './location.routes';
import { router as logierRouter } from './logier.routes';
import { router as memberRouter } from './member.routes';
import { router as offerRouter } from './offer.routes';
import { router as payMentRouter } from './payment.routes';
import { router as planRouter } from './plan.routes';
import { router as productsRouter } from './products.routes';
import { router as roomRouter } from './room.routes';
import { router as sliderRouter } from './slider.routes';
import { router as userRouter } from './user.routes';

export const mountRoutes = async (app:Application)=>{
  app.use('/api/users' , userRouter);
  app.use('/api/plans' , planRouter);
  app.use('/api/rooms' , roomRouter);
  app.use('/api/sliders' , sliderRouter);
  app.use('/api/adds' , addRouter);
  app.use('/api/offers' , offerRouter);
  app.use('/api/events' , eventRoutes);
  app.use('/api/birthdays' , birthDayRouter);
  app.use('/api/categories' , categoriesRouter);
  app.use('/api/products' , productsRouter);
  app.use('/api/members' , memberRouter);
  app.use('/api/logier' , logierRouter);
  app.use('/api/payment' , payMentRouter);
  app.use('/api/location' , locationRouter);
};