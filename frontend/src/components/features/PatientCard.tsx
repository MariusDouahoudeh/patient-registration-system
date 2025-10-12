import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Patient } from '@/types/patient';
import { useLanguage } from '@/contexts/LanguageContext';

interface PatientCardProps {
  patient: Patient;
}

export const PatientCard = ({ patient }: PatientCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLanguage();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const imageUrl = `${API_URL}${patient.documentPhoto}`;

  return (
    <Card hover className="overflow-hidden cursor-pointer">
      <div onClick={() => setIsExpanded(!isExpanded)}>
        {/* Collapsed View */}
        <div className="flex items-center gap-4 p-4">
          <div className="flex-shrink-0">
            <img
              src={imageUrl}
              alt={`${patient.fullName}'s document`}
              className="w-16 h-16 object-cover rounded-lg border-2 border-border"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate">
              {patient.fullName}
            </h3>
            <p className="text-sm text-foreground/60">
              {new Date(patient.createdAt).toLocaleDateString()}
            </p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            <svg
              className="w-6 h-6 text-foreground/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </div>

        {/* Expanded View */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 pt-2 border-t border-border space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-foreground/60 uppercase tracking-wide">
                      {t.patientCard.email}
                    </p>
                    <p className="text-sm text-foreground mt-1 break-all">
                      {patient.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground/60 uppercase tracking-wide">
                      {t.patientCard.phone}
                    </p>
                    <p className="text-sm text-foreground mt-1">
                      {patient.countryCode} {patient.phoneNumber}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-foreground/60 uppercase tracking-wide mb-2">
                    {t.patientCard.documentPhoto}
                  </p>
                  <img
                    src={imageUrl}
                    alt={`${patient.fullName}'s document`}
                    className="w-full h-48 object-cover rounded-lg border border-border"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-foreground/60">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    {t.patientList.registeredOn} {new Date(patient.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};
