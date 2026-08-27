import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

import { Platform } from 'react-native';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark'); 

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      if (theme === 'light') {
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        document.body.style.backgroundColor = 'white'; // Prevents black edges bouncing
      } else {
        document.body.style.filter = 'none';
        document.body.style.backgroundColor = '#030308';
      }
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useAppTheme = () => useContext(ThemeContext);
