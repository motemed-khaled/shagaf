// cronJobs.ts
import cron from 'node-cron';

import { ImemberBooking, MemberBooking } from '../models/memberBooking.model';


export const startCronJob = () => {
  cron.schedule('0 0 * * *', async () => {
    try {
      const currentDate = new Date();
      const bookingsToDelete = await MemberBooking.find({
        end: { $lt: currentDate }
      });

      bookingsToDelete.forEach(async (booking: ImemberBooking) => {
        await MemberBooking.findByIdAndDelete(booking._id);
        console.log(`Deleted booking with id ${booking._id}`);
      });
    } catch (error) {
      console.error('Error deleting bookings:', error);
    }
  }, {
    timezone: 'Africa/Cairo'
  });
};
