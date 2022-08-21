/* eslint-disable @typescript-eslint/no-floating-promises */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import pt from './locales/pt-BR.json';
import en from './locales/en-US.json';

export const resources = {
  'pt-BR': pt,
  'en-US': en,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18n;
