import React from 'react';

import { ThemeContextProvider } from './theme';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GlobalContext = ({ children }: any) => {
  return (
    <>
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </>
  );
};

export default GlobalContext;
