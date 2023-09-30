import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  ThemeProvider,
  useTheme,
  createTheme,
  IconButton,
  Box,
  Button,
  CssBaseline,
} from '@mui/material';
import { getThemePreference, setLocalStorage } from './utils';
import { dark, light } from './config/theme';
import { MetaMaskProvider } from './hooks';

export type RootProps = {
  children: ReactNode;
};

type ToggleTheme = () => void;

export const ToggleThemeContext = createContext({
  toggleColorMode: () => {},
});

export const Root: FunctionComponent<RootProps> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  console.log(theme);

  return (
    <ToggleThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MetaMaskProvider>{children}</MetaMaskProvider>
      </ThemeProvider>
    </ToggleThemeContext.Provider>
  );
};
