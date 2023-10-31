import { GatsbyConfig } from 'gatsby';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const config: GatsbyConfig = {
  // This is required to make use of the React 17+ JSX transform.
  jsxRuntime: 'automatic',

  plugins: [
    'gatsby-plugin-svgr',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'ChainTrack Snap',
        icon: 'src/assets/logo.svg',
        background_color: '#FFFFFF',
        display: 'standalone',
      },
    },
  ],
};

export default config;
