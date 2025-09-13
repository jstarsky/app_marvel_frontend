"use client";

import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "next-themes";
import { store, persistor } from "@/store";
import { AuthProvider } from "@/context/auth";
import { LanguageProvider } from "@/lib/language";
import LoadingMarvel from "@/components/loading-marvel";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <ReduxProvider store={store}>
        <PersistGate loading={<LoadingMarvel loading />} persistor={persistor}>
          <LanguageProvider>
            <AuthProvider>{children}</AuthProvider>
          </LanguageProvider>
        </PersistGate>
      </ReduxProvider>
    </ThemeProvider>
  );
}
