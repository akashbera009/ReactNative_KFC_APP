import React, { ReactNode } from 'react';
import { ThemeProvider } from './ThemeContext';
import { LanguageProvider } from './LanguageContex';
import { CountryProvider } from './CountryContext';
import { MenuCategoryProvider } from './MenuContext';
export const AppProvider = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>
    <LanguageProvider>
      <CountryProvider>
        <MenuCategoryProvider >
            {children}
        </MenuCategoryProvider>
      </CountryProvider>
    </LanguageProvider>
  </ThemeProvider>
);