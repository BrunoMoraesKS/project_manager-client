import { createContext, ReactNode, useState } from 'react';

type ThemeContextProps = {
  children: ReactNode;
};

type ThemeContextType = {
  selectedTheme: string | null;
  setSelectedTheme: (theme: string) => void;
};

const initialValue = {
  selectedTheme: localStorage.getItem('selectedTheme') || 'light',
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
