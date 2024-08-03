// cronJobs.ts
import cron from 'node-cron';

import { ImemberBooking, MemberBooking } from '../models/memberBooking.model';
import { RoomBooking } from '../models/roomBooking.model';
import { Room } from '../models/rooms.model';
import { Users } from '../models/user.model';

export const startCronJob = () => {
  cron.schedule(
    '0 0 * * *',
    async () => {
      try {
        const currentDate = new Date();
        const bookingsToDelete = await MemberBooking.find({
          end: { $lte: currentDate },
        });

        bookingsToDelete.forEach(async (booking: ImemberBooking) => {
          await MemberBooking.findByIdAndDelete(booking._id);
          await Users.findByIdAndUpdate(booking.user, { 'member.count': 0 });
          console.log(`Deleted booking with id ${booking._id}`);
        });
      } catch (error) {
        console.error('Error deleting bookings:', error);
      }
    },
    {
      timezone: 'Africa/Cairo',
    },
  );
};

export const roomCronJob = () => {
  cron.schedule(
    '*/30 * * * *',
    async () => {
      try {
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        const now = new Date();

        const bookings = await RoomBooking.find({
          start: { $gte: twoDaysAgo },
          end: { $lt: now },
          closed: false
        });

        for (const book of bookings) {
          await Room.findByIdAndUpdate(book.room, { $inc: { seatsAvailable: book.seatsCount } });
          await RoomBooking.findByIdAndUpdate(book._id, { closed: true });
        }
      } catch (error) {
        console.error('Error deleting bookings:', error);
      }
    },
    {
      timezone: 'Africa/Cairo',
    },
  );
};
