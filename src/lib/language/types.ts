export enum Language {
  ES = "es",
  EN = "en",
}

export interface UseLanguageContext {
  toggleLanguage?: (lng: Language) => void;
  languages: Language[];
}
