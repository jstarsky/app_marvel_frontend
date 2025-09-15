import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { Language, UseLanguageContext } from "./types";
import { useTranslation } from "react-i18next";
import './config';

const LanguageContext = createContext<UseLanguageContext | undefined>(
  undefined
);
export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const [languages] = useState<Language[]>([
    Language.ES,
    Language.EN,
  ]);

  useEffect(() => {
    if (i18n) {
      i18n.changeLanguage("es");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LanguageContext.Provider value={{ languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider"
    );
  }
  return context;
};
