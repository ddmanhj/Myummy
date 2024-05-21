import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(initReactI18next) // sử dụng react-i18next
  .use(HttpApi) // Sử dụng HttpApi để tải các tệp dịch
  .use(LanguageDetector) // sử dụng LanguageDetector để tự động phát hiện ngôn ngữ
  .init({
    backend: {
      loadPath: `${import.meta.env.VITE_BASE_DOMAIN}src/locales/{{lng}}/{{lng}}.json` // Đường dẫn tới các tệp dịch
    },
    lng: 'vi', // ngôn ngữ mặc định
    fallbackLng: 'en', // ngôn ngữ dự phòng
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;