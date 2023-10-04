import { Theme } from '@mui/material';

const breakpoints = ['600px', '768px', '992px'];

/**
 * Common theme properties.
 */
const commonThemeProps = {
  fonts: {
    default:
      'Inter, sans-serif, -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  },
  fontSizes: {
    text: '1.6rem',
    small: '1.4rem',
  },
  radii: {
    button: '8px',
  },
  breakpoints,
  mediaQueries: {
    small: `@media screen and (max-width: ${breakpoints[0]})`,
    medium: `@media screen and (min-width: ${breakpoints[1]})`,
    large: `@media screen and (min-width: ${breakpoints[2]})`,
  },
};

/**
 * Light theme color properties.
 */
export const light: any = {
  colors: {
    background: {
      inverse: '#141618',
    },
    icon: {
      default: '#141618',
    },
    text: {
      default: '#24272A',
    },
  },
  ...commonThemeProps,
};

/**
 * Dark theme color properties
 */
export const dark: any = {
  colors: {
    background: {
      inverse: '#FFFFFF',
    },
    icon: {
      default: '#FFFFFF',
    },
    text: {
      default: '#FFFFFF',
    },
  },
  ...commonThemeProps,
};

export const getGlobalStyles = (theme: Theme) => ({
  html: { fontSize: '62.5%' },
  body: {
    color: theme?.custom?.colors?.text?.default,
    fontFamily: theme?.custom?.fonts?.default,
    fontSize: theme?.custom?.fontSizes?.text,
    margin: 0,
  },
  '*': {
    transition: 'background-color .1s linear',
  },
  button: {
    fontSize: theme?.custom?.fontSizes?.small,
    borderRadius: theme?.custom?.radii?.button,
    border: `1[x solid ${theme?.custom?.colors?.background?.inverse}`,
    fontWeight: 'bold',
    padding: '1rem',
    minHeight: '4.2rem',
    cursor: 'pointer',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      backgroundColor: 'transparent',
      border: `1px solid ${theme?.custom?.colors?.background?.inverse}`,
    },
  },
});
