import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FileDropzone } from '@/components/ui/FileDropzone';
import { Modal } from '@/components/ui/Modal';
import { patientApi } from '@/lib/api';
import { CreatePatientDto } from '@/types/patient';
import { useLanguage } from '@/contexts/LanguageContext';

interface PatientFormProps {
  onSuccess: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  documentPhoto: File | null;
}

type ModalState = 'idle' | 'loading' | 'success' | 'error';

export const PatientForm = ({ onSuccess }: PatientFormProps) => {
  const [modalState, setModalState] = useState<ModalState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [documentPhoto, setDocumentPhoto] = useState<File | null>(null);
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Validate document photo
    if (!documentPhoto) {
      setError('documentPhoto', { message: t.patientForm.documentPhoto.required });
      return;
    }

    setModalState('loading');

    try {
      await patientApi.create({
        fullName: data.fullName,
        email: data.email,
        countryCode: data.countryCode,
        phoneNumber: data.phoneNumber,
        documentPhoto,
      } as CreatePatientDto);

      setModalState('success');
      reset();
      setDocumentPhoto(null);

      // Auto close and refresh after 2 seconds
      setTimeout(() => {
        setModalState('idle');
        onSuccess();
      }, 2000);
    } catch (error: any) {
      setModalState('error');
      setErrorMessage(
        error.response?.data?.message || 
        error.response?.data?.errors?.[0]?.msg ||
        'Failed to register patient. Please try again.'
      );
    }
  };

  const closeModal = () => {
    setModalState('idle');
    setErrorMessage('');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label={t.patientForm.fullName.label}
          placeholder={t.patientForm.fullName.placeholder}
          required
          error={errors.fullName?.message}
          {...register('fullName', {
            required: t.patientForm.fullName.required,
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
              message: t.patientForm.fullName.pattern,
            },
          })}
        />

        <Input
          label={t.patientForm.email.label}
          type="email"
          placeholder={t.patientForm.email.placeholder}
          required
          error={errors.email?.message}
          {...register('email', {
            required: t.patientForm.email.required,
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
              message: t.patientForm.email.pattern,
            },
          })}
        />

        <div className="grid grid-cols-3 gap-3">
          <Input
            label={t.patientForm.countryCode.label}
            placeholder={t.patientForm.countryCode.placeholder}
            required
            error={errors.countryCode?.message}
            {...register('countryCode', {
              required: t.patientForm.countryCode.required,
              pattern: {
                value: /^\+\d{1,4}$/,
                message: t.patientForm.countryCode.pattern,
              },
            })}
          />
          <div className="col-span-2">
            <Input
              label={t.patientForm.phoneNumber.label}
              placeholder={t.patientForm.phoneNumber.placeholder}
              required
              error={errors.phoneNumber?.message}
              {...register('phoneNumber', {
                required: t.patientForm.phoneNumber.required,
                pattern: {
                  value: /^\d{6,15}$/,
                  message: t.patientForm.phoneNumber.pattern,
                },
              })}
            />
          </div>
        </div>

        <FileDropzone
          onFileSelect={setDocumentPhoto}
          error={errors.documentPhoto?.message}
        />

        <Button type="submit" className="w-full" isLoading={modalState === 'loading'}>
          {t.patientForm.submit}
        </Button>
      </form>

      {/* Status Modal */}
      <Modal isOpen={modalState !== 'idle'} onClose={closeModal}>
        <div className="text-center py-4">
          {modalState === 'loading' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-lg font-medium text-foreground">{t.modal.loading}</p>
            </motion.div>
          )}

          {modalState === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="w-16 h-16 bg-success rounded-full flex items-center justify-center"
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
              <div>
                <p className="text-xl font-bold text-foreground">{t.modal.success.title}</p>
                <p className="text-sm text-foreground/60 mt-1">
                  {t.modal.success.message}
                </p>
              </div>
            </motion.div>
          )}

          {modalState === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 bg-error rounded-full flex items-center justify-center"
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.div>
              <div>
                <p className="text-xl font-bold text-foreground">{t.modal.error.title}</p>
                <p className="text-sm text-foreground/60 mt-1">{errorMessage}</p>
              </div>
              <Button onClick={closeModal} variant="secondary" className="mt-2">
                {t.modal.tryAgain}
              </Button>
            </motion.div>
          )}
        </div>
      </Modal>
    </>
  );
};
