import { FunctionComponent, ReactNode, useContext } from 'react';
import { Box, GlobalStyles } from '@mui/material';
import { Footer, Header } from './components';

import { getGlobalStyles } from './config/theme';
import { ToggleThemeContext } from './Root';

export type AppProps = {
  children: ReactNode;
};

export const App: FunctionComponent<AppProps> = ({ children }) => {
  const toggleTheme = useContext(ToggleThemeContext);
  console.log(toggleTheme);

  return (
    <>
      <GlobalStyles styles={getGlobalStyles} />
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        minHeight="100vh"
        maxWidth="100vw"
      >
        <Header handleToggleClick={toggleTheme.toggleColorMode} />
        {children}
        <Footer />
      </Box>
    </>
  );
};
