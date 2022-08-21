import React, { useContext } from 'react';
import '../src/i18n';
import { GlobalStyles } from './global/styles/globals';
import { ThemeProvider } from 'styled-components';
import { ThemeContext } from './context/theme';
import { dark, light } from './global/styles/themeConfig';

function App() {
  const { selectedTheme } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={selectedTheme === 'light' ? light : dark}>
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
