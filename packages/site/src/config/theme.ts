import { createGlobalStyle, DefaultTheme } from 'styled-components';

const breakpoints = ['600px', '768px', '992px'];

/**
 * Common theme properties.
 */
const theme = {
  fonts: {
    default:
      'Inter, sans-serif, -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
    code: 'ui-monospace,Menlo,Monaco,"Cascadia Mono","Segoe UI Mono","Roboto Mono","Oxygen Mono","Ubuntu Monospace","Source Code Pro","Fira Mono","Droid Sans Mono","Courier New", monospace',
  },
  fontSizes: {
    heading: '5.2rem',
    mobileHeading: '3.6rem',
    title: '2.4rem',
    large: '2rem',
    text: '1.6rem',
    small: '1.4rem',
  },
  radii: {
    default: '24px',
    button: '8px',
  },
  breakpoints,
  mediaQueries: {
    small: `@media screen and (max-width: ${breakpoints[0]})`,
    medium: `@media screen and (min-width: ${breakpoints[1]})`,
    large: `@media screen and (min-width: ${breakpoints[2]})`,
  },
  shadows: {
    default: '0px 7px 42px rgba(0, 0, 0, 0.1)',
    button: '0px 0px 16.1786px rgba(0, 0, 0, 0.15);',
  },
};

/**
 * Light theme color properties.
 */
export const light: any = {
  colors: {
    background: {
      default: '#FFFFFF',
      alternative: '#F2F4F6',
      inverse: '#141618',
    },
    icon: {
      default: '#141618',
      alternative: '#BBC0C5',
    },
    text: {
      default: '#24272A',
      muted: '#6A737D',
      alternative: '#535A61',
      inverse: '#FFFFFF',
    },
    border: {
      default: '#BBC0C5',
    },
    primary: {
      default: '#6F4CFF',
      inverse: '#FFFFFF',
    },
    card: {
      default: '#FFFFFF',
    },
    error: {
      default: '#d73a49',
      alternative: '#b92534',
      muted: '#d73a4919',
    },
    about: {
      default: 'white',
      inverse: 'black',
      card: '#e1dbd8',
      inverseCard: '#e1dbd8',
      testimonialBorder: '1px solid rgba(000, 000, 000, 0.5)',
    },
  },
  ...theme,
};

/**
 * Dark theme color properties
 */
export const dark: any = {
  colors: {
    background: {
      default: '#24272A',
      alternative: '#141618',
      inverse: '#FFFFFF',
    },
    icon: {
      default: '#FFFFFF',
      alternative: '#BBC0C5',
    },
    text: {
      default: '#FFFFFF',
      muted: '#FFFFFF',
      alternative: '#D6D9DC',
      inverse: '#24272A',
    },
    border: {
      default: '#848C96',
    },
    primary: {
      default: '#6F4CFF',
      inverse: '#FFFFFF',
    },
    card: {
      default: '#141618',
    },
    error: {
      default: '#d73a49',
      alternative: '#b92534',
      muted: '#d73a4919',
    },
    about: {
      default: 'black',
      inverse: 'white',
      card: '#1e2427',
      inverseCard: '#e1dbd8',
      testimonialBorder: '1px solid rgba(255, 255, 255, 0.5)',
    },
  },
  ...theme,
};

type Test = {
  theme: {
    palette: any;
  };
};

/**
 * Default style applied to the app.
 *
 * @param props - Styled Components props.
 * @returns Global style React component.
 */
export const GlobalStyle = createGlobalStyle<Test>`
  html {
    /* 62.5% of the base size of 16px = 10px.*/
    font-size: 62.5%;
  }

  body {
    //background-color: ${(props) => props.theme.palette.background.default};
    //color: ${(props) => props.theme.colors.text.default};
    //font-family: ${(props) => props.theme.fonts.default};
    //font-size: ${(props) => props.theme.fontSizes.text};
    margin: 0;
  }

  * {
    transition: background-color .1s linear;
  }

  h1, h2, h3, h4, h5, h6 {
    //font-size: ${(props) => props.theme.fontSizes.heading};
  }

  code {
    //background-color: ${(props) => props.theme.colors.background.alternative};
    //font-family: ${(props) => props.theme.fonts.code};
    padding: 1.2rem;
    font-weight: normal;
    //font-size: ${(props) => props.theme.fontSizes.text};
  }

  button {
    //font-size: ${(props) => props.theme.fontSizes.small};
    //border-radius: ${(props) => props.theme.radii.button};
    // background-color: ${(props) => props.theme.colors.background.inverse};
    //color: ${(props) => props.theme.colors.text.inverse};
    // border: 1px solid ${(props) => props.theme.colors.background.inverse};
    font-weight: bold;
    padding: 1rem;
    min-height: 4.2rem;
    cursor: pointer;
    transition: all .2s ease-in-out;

    &:hover {
      background-color: transparent;
      //border: 1px solid ${(props) => props.theme.colors.background.inverse};
      //color: ${(props) => props.theme.colors.text.default};
    }

    &:disabled,
    &[disabled] {
      //border: 1px solid ${(props) => props.theme.colors.background.inverse};
      cursor: not-allowed;
    }

    &:disabled:hover,
    &[disabled]:hover {
      //background-color: ${(props) => props.theme.colors.background.inverse};
      //color: ${(props) => props.theme.colors.text.inverse};
      // border: 1px solid ${(props) => props.theme.colors.background.inverse};
    }
  }
`;
