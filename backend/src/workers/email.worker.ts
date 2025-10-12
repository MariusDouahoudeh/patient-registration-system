import { Worker, Job } from 'bullmq';
import redisConnection from '../config/redis';
import { sendConfirmationEmail } from '../services/email.service';

interface EmailJobData {
  email: string;
  fullName: string;
  patientId: string;
}

export const emailWorker = new Worker<EmailJobData>(
  'email-notifications',
  async (job: Job<EmailJobData>) => {
    const { email, fullName, patientId } = job.data;

    console.log(`📧 Processing email job for ${email}`);

    try {
      await sendConfirmationEmail(email, fullName);
      console.log(`✅ Email sent successfully to ${email}`);
      return { success: true, email };
    } catch (error) {
      console.error(`❌ Failed to send email to ${email}:`, error);
      throw error;
    }
  },
  {
    connection: redisConnection,
    concurrency: 5,
  }
);

emailWorker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

emailWorker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err.message);
});

export default emailWorker;
