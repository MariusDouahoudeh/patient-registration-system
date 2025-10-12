import { useState, useEffect } from 'react';
import { Language, translations, Translations } from '@/i18n/translations';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('language') as Language | null;
    if (stored && (stored === 'en-US' || stored === 'es-AR')) {
      return stored;
    }
    // Default to English
    return 'en-US';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en-US' ? 'es-AR' : 'en-US'));
  };

  const t: Translations = translations[language];

  return { language, toggleLanguage, t };
};
