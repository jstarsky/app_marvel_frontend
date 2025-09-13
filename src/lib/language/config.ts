import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { es, en } from "./translation";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: es,
      },
      en: {
        translation: en,
      },
    },
    fallbackLng: "es",
    debug: false,
    detection: {
      order: [
        "navigator", // Browser language (ca-ES, es-ES)
        "htmlTag", // <html lang="ca">
        "querystring", // ?lng=ca in URL
      ],
      lookupQuerystring: "lng",
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage"],
    },
  });

export default i18n;
