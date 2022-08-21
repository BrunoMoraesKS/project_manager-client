import React from 'react';

import { ThemeContextProvider } from './theme';

const GlobalContext = ({ children }: any) => {
  return (
    <>
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </>
  );
};

export default GlobalContext;
