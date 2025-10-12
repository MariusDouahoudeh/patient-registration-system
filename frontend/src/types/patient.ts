export interface Patient {
  id: string;
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  documentPhoto: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientDto {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  documentPhoto: File;
}
