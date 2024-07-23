import mongoose from 'mongoose';

import { dbConnection } from './../src/config/database_connection';
import { Plan, PlanTypes } from './../src/models/plan.model';
import { Setting } from './../src/models/settings.models';

async function seedAdminAccount() {
  await dbConnection();
  try {
    await Setting.create({ sharedRoomPlan: false });
    await Plan.create({
      type: PlanTypes.shared,
      title: 'Shared Plan',
      shared: {
        hourOne: 1,
        hourTwo: 2,
        hourThree: 3,
        hourFour: 4,
      },
    });

    await Plan.create({
      type: PlanTypes.private,
      title: 'Private Plan',
      private: {
        price: 100,
      },
    });
    console.log('seeder run successfully');
  } catch (error) {
    console.error('Error seeding admin account:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seedAdminAccount();
