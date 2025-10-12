import axios from 'axios';
import { Patient, CreatePatientDto } from '@/types/patient';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const patientApi = {
  async getAll(): Promise<Patient[]> {
    const response = await api.get<{ status: string; data: Patient[] }>('/api/patients');
    return response.data.data;
  },

  async create(data: CreatePatientDto): Promise<Patient> {
    const formData = new FormData();
    formData.append('fullName', data.fullName);
    formData.append('email', data.email);
    formData.append('countryCode', data.countryCode);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('documentPhoto', data.documentPhoto);

    const response = await api.post<{ status: string; data: Patient }>('/api/patients', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },
};

export default api;
