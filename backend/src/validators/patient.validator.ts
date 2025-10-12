import { body, ValidationChain } from 'express-validator';

export const createPatientValidator: ValidationChain[] = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('Full name must contain only letters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .matches(/@gmail\.com$/)
    .withMessage('Only @gmail.com addresses are allowed')
    .normalizeEmail(),

  body('countryCode')
    .trim()
    .notEmpty()
    .withMessage('Country code is required')
    .matches(/^\+\d{1,4}$/)
    .withMessage('Invalid country code format (e.g., +598)'),

  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\d{6,15}$/)
    .withMessage('Phone number must contain 6-15 digits'),
];
