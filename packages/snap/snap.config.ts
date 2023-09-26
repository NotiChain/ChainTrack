import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack';
import type { SnapConfig } from '@metamask/snaps-cli';
import dotenv from 'dotenv';
import { merge } from '@metamask/snaps-cli';

dotenv.config({ path: path.resolve(process.cwd(), '../..', '.env') });

const config: SnapConfig = {
  bundler: 'webpack',
  input: path.resolve(__dirname, 'src/index.ts'),
  server: {
    port: 8081,
  },
  polyfills: {
    buffer: true,
  },
  customizeWebpackConfig(webpackConfig) {
    return merge(webpackConfig, {
      plugins: [
        new webpack.DefinePlugin({
          'process.env': JSON.stringify(process.env),
        }),
      ],
    });
  },
};

export default config;
