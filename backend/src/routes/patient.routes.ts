import { Router } from 'express';
import { patientController } from '../controllers/patient.controller';
import { createPatientValidator } from '../validators/patient.validator';
import { upload } from '../config/multer';

export const patientRoutes = Router();

patientRoutes.post(
  '/',
  upload.single('documentPhoto'),
  createPatientValidator,
  patientController.createPatient.bind(patientController)
);

patientRoutes.get('/', patientController.getAllPatients.bind(patientController));

patientRoutes.get('/:id', patientController.getPatientById.bind(patientController));
