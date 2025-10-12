export type Language = 'en-US' | 'es-AR';

export interface Translations {
  header: {
    title: string;
    subtitle: string;
    addPatient: string;
  };
  patientList: {
    loading: string;
    error: string;
    retry: string;
    empty: {
      title: string;
      subtitle: string;
    };
    registeredOn: string;
  };
  patientCard: {
    email: string;
    phone: string;
    documentPhoto: string;
  };
  patientForm: {
    title: string;
    fullName: {
      label: string;
      placeholder: string;
      required: string;
      pattern: string;
    };
    email: {
      label: string;
      placeholder: string;
      required: string;
      pattern: string;
    };
    countryCode: {
      label: string;
      placeholder: string;
      required: string;
      pattern: string;
    };
    phoneNumber: {
      label: string;
      placeholder: string;
      required: string;
      pattern: string;
    };
    documentPhoto: {
      label: string;
      required: string;
      dropzone: {
        title: string;
        browse: string;
        maxSize: string;
      };
      clickToChange: string;
    };
    submit: string;
    submitting: string;
  };
  modal: {
    loading: string;
    success: {
      title: string;
      message: string;
    };
    error: {
      title: string;
    };
    tryAgain: string;
  };
  footer: {
    copyright: string;
  };
}

const enUS: Translations = {
  header: {
    title: 'Patient Registration',
    subtitle: 'Manage patient records',
    addPatient: 'Add Patient',
  },
  patientList: {
    loading: 'Loading patients...',
    error: 'Failed to load patients',
    retry: 'Try again',
    empty: {
      title: 'No patients yet',
      subtitle: 'Start by adding your first patient',
    },
    registeredOn: 'Registered on',
  },
  patientCard: {
    email: 'Email',
    phone: 'Phone',
    documentPhoto: 'Document Photo',
  },
  patientForm: {
    title: 'Register New Patient',
    fullName: {
      label: 'Full Name',
      placeholder: 'John Doe',
      required: 'Full name is required',
      pattern: 'Full name must contain only letters',
    },
    email: {
      label: 'Email',
      placeholder: 'example@gmail.com',
      required: 'Email is required',
      pattern: 'Only @gmail.com addresses are allowed',
    },
    countryCode: {
      label: 'Country Code',
      placeholder: '+1',
      required: 'Country code is required',
      pattern: 'Invalid format (e.g., +1)',
    },
    phoneNumber: {
      label: 'Phone Number',
      placeholder: '5551234567',
      required: 'Phone number is required',
      pattern: 'Must be 6-15 digits',
    },
    documentPhoto: {
      label: 'Document Photo',
      required: 'Document photo is required',
      dropzone: {
        title: 'Drop your JPG image here, or',
        browse: 'browse',
        maxSize: 'Maximum file size: 5MB',
      },
      clickToChange: 'Click to change',
    },
    submit: 'Register Patient',
    submitting: 'Registering patient...',
  },
  modal: {
    loading: 'Registering patient...',
    success: {
      title: 'Success!',
      message: 'Patient registered successfully',
    },
    error: {
      title: 'Error',
    },
    tryAgain: 'Try Again',
  },
  footer: {
    copyright: 'Patient Registration System',
  },
};

const esAR: Translations = {
  header: {
    title: 'Registro de Pacientes',
    subtitle: 'Administrá registros de pacientes',
    addPatient: 'Agregar Paciente',
  },
  patientList: {
    loading: 'Cargando pacientes...',
    error: 'Error al cargar pacientes',
    retry: 'Intentar de nuevo',
    empty: {
      title: 'No hay pacientes todavía',
      subtitle: 'Comenzá agregando tu primer paciente',
    },
    registeredOn: 'Registrado el',
  },
  patientCard: {
    email: 'Email',
    phone: 'Teléfono',
    documentPhoto: 'Foto del Documento',
  },
  patientForm: {
    title: 'Registrar Nuevo Paciente',
    fullName: {
      label: 'Nombre Completo',
      placeholder: 'Juan Pérez',
      required: 'El nombre completo es requerido',
      pattern: 'El nombre debe contener solo letras',
    },
    email: {
      label: 'Email',
      placeholder: 'ejemplo@gmail.com',
      required: 'El email es requerido',
      pattern: 'Solo se permiten direcciones @gmail.com',
    },
    countryCode: {
      label: 'Código de País',
      placeholder: '+54',
      required: 'El código de país es requerido',
      pattern: 'Formato inválido (ej: +54)',
    },
    phoneNumber: {
      label: 'Número de Teléfono',
      placeholder: '1123456789',
      required: 'El número de teléfono es requerido',
      pattern: 'Debe tener entre 6 y 15 dígitos',
    },
    documentPhoto: {
      label: 'Foto del Documento',
      required: 'La foto del documento es requerida',
      dropzone: {
        title: 'Arrastrá tu imagen JPG acá, o',
        browse: 'buscá',
        maxSize: 'Tamaño máximo: 5MB',
      },
      clickToChange: 'Hacé clic para cambiar',
    },
    submit: 'Registrar Paciente',
    submitting: 'Registrando paciente...',
  },
  modal: {
    loading: 'Registrando paciente...',
    success: {
      title: '¡Éxito!',
      message: 'Paciente registrado exitosamente',
    },
    error: {
      title: 'Error',
    },
    tryAgain: 'Intentar de Nuevo',
  },
  footer: {
    copyright: 'Sistema de Registro de Pacientes',
  },
};

export const translations: Record<Language, Translations> = {
  'en-US': enUS,
  'es-AR': esAR,
};
