import React, { FunctionComponent, ReactNode, useContext } from 'react';
import { Box, GlobalStyles, useTheme } from '@mui/material';
import { Footer, Header } from './components';

import { getGlobalStyles } from './config/theme';
import { ToggleThemeContext } from './Root';
import { Donate } from './components/Donate';

export type AppProps = {
  children: ReactNode;
};

export const App: FunctionComponent<AppProps> = ({ children }) => {
  const toggleTheme = useContext(ToggleThemeContext);
  const theme = useTheme();

  return (
    <>
      <GlobalStyles styles={getGlobalStyles} />
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        minHeight="100vh"
        maxWidth="100vw"
        sx={{
          background:
            theme?.palette?.mode === 'dark'
              ? 'linear-gradient(315deg, #000000 0%, #5e5368 50%)'
              : '',
        }}
      >
        <Header handleToggleClick={toggleTheme.toggleColorMode} />
        {children}
        <Donate />
        <Footer />
      </Box>
    </>
  );
};
