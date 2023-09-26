import path from 'path';
import type { SnapConfig } from '@metamask/snaps-cli';
import dotenv from 'dotenv';

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
};

export default config;
