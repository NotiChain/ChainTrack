import { getLocalStorage, setLocalStorage } from './localStorage';

type Theme = 'dark' | 'light' | null;

export const getThemePreference = (): Theme => {
  if (typeof window === 'undefined') {
    return null;
  }

  let darkModeSystem;
  if (typeof window !== 'undefined') {
    darkModeSystem = window?.matchMedia(
      '(prefers-color-scheme: dark)',
    )?.matches;
  }

  const localStoragePreference = getLocalStorage('theme');
  const systemPreference = darkModeSystem ? 'dark' : 'light';
  const preference = localStoragePreference ?? systemPreference;

  if (!localStoragePreference) {
    setLocalStorage('theme', systemPreference);
  }

  return preference as Theme;
};
