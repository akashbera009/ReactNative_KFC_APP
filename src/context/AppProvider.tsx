import React, { ReactNode } from 'react';
import { ThemeProvider } from './ThemeContext';
import { LanguageProvider } from './LanguageContex';
import { CountryProvider } from './CountryContext';
import { CartProvider } from './CartContext';
import { MenuProvider } from './MenuContext';
import { OrderQueueProvider } from './OrderQueueContext';

export const AppProvider = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>
    <LanguageProvider>
      <CountryProvider>
        <MenuProvider>
          <CartProvider>
            <OrderQueueProvider>
              {children}
            </OrderQueueProvider>
          </CartProvider>
        </MenuProvider>
      </CountryProvider>
    </LanguageProvider>
  </ThemeProvider>
);
