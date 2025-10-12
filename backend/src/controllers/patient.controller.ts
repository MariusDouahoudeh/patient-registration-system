import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { patientService } from '../services/patient.service';
import { AppError } from '../middleware/error.middleware';

export class PatientController {
  async createPatient(req: Request, res: Response, next: NextFunction) {
    try {
      // Validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          errors: errors.array(),
        });
      }

      // Check if file was uploaded
      if (!req.file) {
        throw new AppError(400, 'Document photo is required');
      }

      const { fullName, email, countryCode, phoneNumber } = req.body;
      const documentPhoto = `/uploads/${req.file.filename}`;

      const patient = await patientService.createPatient({
        fullName,
        email,
        countryCode,
        phoneNumber,
        documentPhoto,
      });

      res.status(201).json({
        status: 'success',
        data: patient,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllPatients(req: Request, res: Response, next: NextFunction) {
    try {
      const patients = await patientService.getAllPatients();

      res.status(200).json({
        status: 'success',
        data: patients,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPatientById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const patient = await patientService.getPatientById(id);

      res.status(200).json({
        status: 'success',
        data: patient,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const patientController = new PatientController();
