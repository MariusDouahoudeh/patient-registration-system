import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';
import { emailQueue } from '../queues/email.queue';

export interface CreatePatientDto {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  documentPhoto: string;
}

export class PatientService {
  async createPatient(data: CreatePatientDto) {
    // Check if email already exists
    const existingPatient = await prisma.patient.findUnique({
      where: { email: data.email },
    });

    if (existingPatient) {
      throw new AppError(400, 'Email already registered');
    }

    // Create patient
    const patient = await prisma.patient.create({
      data,
    });

    // Queue confirmation email
    await emailQueue.add('confirmation-email', {
      email: patient.email,
      fullName: patient.fullName,
      patientId: patient.id,
    });

    return patient;
  }

  async getAllPatients() {
    return prisma.patient.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPatientById(id: string) {
    const patient = await prisma.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      throw new AppError(404, 'Patient not found');
    }

    return patient;
  }
}

export const patientService = new PatientService();
