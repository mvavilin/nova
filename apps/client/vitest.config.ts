import { defineConfig } from 'vitest/config';
import path from 'node:path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  root: path.resolve(__dirname),
  test: {
    globals: true,
    environment: 'jsdom',
    pool: 'threads',
  },
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src'),
  //   },
  // },
  plugins: [tsconfigPaths()],
});
