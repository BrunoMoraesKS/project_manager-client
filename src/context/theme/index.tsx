/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createContext, ReactNode, useState } from 'react';

interface ThemeContextProps {
  children: ReactNode;
}

interface ThemeContextType {
  selectedTheme: string | null;
  setSelectedTheme: (theme: string) => void;
}

const initialValue = {
  selectedTheme: localStorage.getItem('selectedTheme') ?? 'light',
  setSelectedTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(initialValue);

export const ThemeContextProvider = ({ children }: ThemeContextProps) => {
  const [selectedTheme, setSelectedTheme] = useState(
    initialValue.selectedTheme
  );

  return (
    <ThemeContext.Provider value={{ selectedTheme, setSelectedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
