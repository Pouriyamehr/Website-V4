"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import { translations, type SupportedLanguage, type RootTranslations } from "../i18n";

type LanguageContextValue = {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: RootTranslations;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>("en");

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
