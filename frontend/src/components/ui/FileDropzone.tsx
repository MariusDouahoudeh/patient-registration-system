import { useState, useRef, DragEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
  error?: string;
  accept?: string;
  maxSize?: number;
}

export const FileDropzone = ({
  onFileSelect,
  error,
  accept = 'image/jpeg,image/jpg',
  maxSize = 5 * 1024 * 1024, // 5MB
}: FileDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handleFile = (file: File) => {
    // Validate file type
    if (!accept.split(',').includes(file.type)) {
      alert('Only JPG images are allowed');
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      alert(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setFileName(file.name);
    onFileSelect(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1.5 text-foreground">
        {t.patientForm.documentPhoto.label} <span className="text-error ml-1">*</span>
      </label>
      <motion.div
        whileHover={{ scale: 1.01 }}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-6 cursor-pointer
          transition-all duration-200
          ${isDragging ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-border'}
          ${error ? 'border-error' : ''}
          ${preview ? 'bg-card' : 'bg-background'}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />

        {preview ? (
          <div className="flex flex-col items-center gap-3">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="text-sm text-foreground/70">{fileName}</p>
            <p className="text-xs text-primary-500">{t.patientForm.documentPhoto.clickToChange}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-center">
            <svg
              className="w-12 h-12 text-foreground/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-foreground">
                {t.patientForm.documentPhoto.dropzone.title}{' '}
                <span className="text-primary-500">{t.patientForm.documentPhoto.dropzone.browse}</span>
              </p>
              <p className="text-xs text-foreground/60 mt-1">
                {t.patientForm.documentPhoto.dropzone.maxSize}
              </p>
            </div>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="error-message"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
