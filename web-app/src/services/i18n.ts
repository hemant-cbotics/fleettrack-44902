import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { APP_CONFIG } from "../constants/constants";
import { language_en } from "../translations/en";

const resources = {
  en: {
    translation: language_en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  debug: APP_CONFIG.DEBUG.ALL,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;