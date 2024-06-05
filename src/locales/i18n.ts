import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import vi from '@/locales/vi/vi.json'
import en from '@/locales/en/en.json'

i18n
  .use(initReactI18next) // sử dụng react-i18next
  .use(LanguageDetector) // sử dụng LanguageDetector để tự động phát hiện ngôn ngữ
  .init({
    resources: {
      vi: {translation: vi},
      en: {translation: en}
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;