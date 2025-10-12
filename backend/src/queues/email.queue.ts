import { Queue } from 'bullmq';
import redisConnection from '../config/redis';

export const emailQueue = new Queue('email-notifications', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

console.log('📬 Email queue initialized');
