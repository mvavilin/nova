import 'vitest/config';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    root: 'src',
    coverage: {
      provider: 'v8',
      include: ['./**/*.ts'],
      exclude: ['prisma', 'types'],
      reporter: ['text', 'json', 'html'],
    },
  },
});
