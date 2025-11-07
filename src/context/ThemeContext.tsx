import React, { createContext, useState, ReactNode, useContext } from 'react';

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ColorContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
