import { Router } from 'express';
import { patientController } from '../controllers/patient.controller';
import { createPatientValidator } from '../validators/patient.validator';
import { upload } from '../config/multer';

export const patientRoutes = Router();

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Register a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - countryCode
 *               - phoneNumber
 *               - documentPhoto
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Patient's full name (letters and spaces only)
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Patient's email (must be @gmail.com)
 *                 example: john.doe@gmail.com
 *               countryCode:
 *                 type: string
 *                 description: Country code with + prefix
 *                 example: +1
 *               phoneNumber:
 *                 type: string
 *                 description: Phone number (6-15 digits)
 *                 example: 5551234567
 *               documentPhoto:
 *                 type: string
 *                 format: binary
 *                 description: JPG image of patient's document (max 5MB)
 *     responses:
 *       201:
 *         description: Patient registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 fullName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 countryCode:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 documentPhoto:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Validation error or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                       message:
 *                         type: string
 */
patientRoutes.post(
  '/',
  upload.single('documentPhoto'),
  createPatientValidator,
  patientController.createPatient.bind(patientController)
);

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Get all registered patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: List of all patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   fullName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   countryCode:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *                   documentPhoto:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
patientRoutes.get('/', patientController.getAllPatients.bind(patientController));

/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Get a patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 fullName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 countryCode:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 documentPhoto:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Patient not found
 */
patientRoutes.get('/:id', patientController.getPatientById.bind(patientController));
