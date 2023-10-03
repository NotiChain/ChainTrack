import { getLocalStorage, setLocalStorage } from './localStorage';

type Theme = 'dark' | 'light';

/**
 * Get the user's preferred theme in local storage.
 * Will default to the browser's preferred theme if there is no value in local storage.
 *
 * @returns Theme
 */
export const getThemePreference = (): Theme => {
  const darkModeSystem = window?.matchMedia(
    '(prefers-color-scheme: dark)',
  )?.matches;

  const localStoragePreference = getLocalStorage('theme');
  const systemPreference = darkModeSystem ? 'dark' : 'light';
  const preference = localStoragePreference ?? systemPreference;

  if (!localStoragePreference) {
    setLocalStorage('theme', systemPreference);
  }

  return preference as Theme;
};
