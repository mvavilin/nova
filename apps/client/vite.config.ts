import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [tsconfigPaths(), tailwindcss()],

  root: path.resolve(__dirname),

  server: {
    port: 3000,
    open: true,
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      // input: path.resolve(__dirname, 'main.ts'),
    },
  },
});
