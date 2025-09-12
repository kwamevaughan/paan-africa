import { useRouter } from 'next/router';
import { useMemo } from 'react';

// Import translation files
import enMessages from '../messages/en.json';
import frMessages from '../messages/fr.json';

const messages = {
  en: enMessages,
  fr: frMessages
};

export const useAppTranslations = () => {
  const router = useRouter();
  const locale = router.locale || 'en';
  
  const t = useMemo(() => {
    return (key) => {
      const keys = key.split('.');
      let value = messages[locale] || messages.en;
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          // Fallback to English if translation not found
          value = messages.en;
          for (const fallbackKey of keys) {
            if (value && typeof value === 'object' && fallbackKey in value) {
              value = value[fallbackKey];
            } else {
              return key; // Return the key if no translation found
            }
          }
          break;
        }
      }
      
      return value || key;
    };
  }, [locale]);
  
  const tn = useMemo(() => {
    return (namespace, key) => {
      const fullKey = `${namespace}.${key}`;
      return t(fullKey);
    };
  }, [t]);
  
  return {
    t,
    tn,
    locale
  };
};
