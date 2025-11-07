import React, { ReactNode } from 'react';
import { ThemeProvider } from './ThemeContext';
import { LanguageProvider } from './LanguageContex'; 
import { CountryProvider } from './CountryContext';

export const AppProvider = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>
    <LanguageProvider>
      <CountryProvider>
      {children}
      </CountryProvider>
    </LanguageProvider>
  </ThemeProvider>
);
