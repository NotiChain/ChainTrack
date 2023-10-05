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

  React.useEffect(() => {
    document.title = 'ChainTrack';
  });

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
              ? 'linear-gradient(315deg, rgba(0,0,0,1) 0%, rgba(94,83,104,1) 50%, rgba(0,0,0,1) 100%)'
              : 'linear-gradient(315deg, #44b09e 0%, #e0d2c7 74%)',
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
