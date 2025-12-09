import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ColorContext = createContext<ColorContextType | undefined>(undefined);
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem('isDarkMode');
      if (saved !== null) {
        setIsDarkMode(saved === 'true');
      }
    };
    loadTheme();
  }, []);
  useEffect(() => {
    AsyncStorage.setItem('isDarkMode', String(isDarkMode));
  }, [isDarkMode]);

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
