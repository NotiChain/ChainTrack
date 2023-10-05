import {
  createContext,
  FunctionComponent,
  ReactNode,
  useMemo,
  useState,
} from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import {
  lime,
  purple,
  deepPurple,
  blueGrey,
  indigo,
  pink,
  lightBlue,
  teal,
  deepOrange,
  grey,
  brown,
} from '@mui/material/colors';
import { MetaMaskProvider } from './hooks';
import { getThemePreference, setLocalStorage } from './utils';
import { dark, light } from './config/theme';

declare module '@mui/material/styles' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ThemeOptions {
    custom: any;
  }
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
  interface Theme extends ThemeOptions {}
}

export type RootProps = {
  children: ReactNode;
};

export const ToggleThemeContext = createContext({
  toggleColorMode: () => {},
});

export const Root: FunctionComponent<RootProps> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(getThemePreference());
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newTheme = prevMode === 'light' ? 'dark' : 'light';
          setLocalStorage('theme', newTheme);
          return newTheme;
        });
      },
    }),
    [],
  );

  const theme = createTheme({
    palette: {
      mode,
      primary: mode === 'dark' ? blueGrey : brown,
      secondary: mode === 'dark' ? grey : blueGrey,
    },
    custom: mode === 'dark' ? { ...dark } : { ...light },
  });

  return (
    <ToggleThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MetaMaskProvider>{children}</MetaMaskProvider>
      </ThemeProvider>
    </ToggleThemeContext.Provider>
  );
};
