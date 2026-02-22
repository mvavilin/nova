import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: { open: true },

  plugins: [tsconfigPaths(), tailwindcss()],
});
