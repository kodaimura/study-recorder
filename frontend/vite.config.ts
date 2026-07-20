import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      apis: fileURLToPath(new URL('./src/apis', import.meta.url)),
      components: fileURLToPath(new URL('./src/components', import.meta.url)),
      routes: fileURLToPath(new URL('./src/routes', import.meta.url)),
      styles: fileURLToPath(new URL('./src/styles', import.meta.url)),
      types: fileURLToPath(new URL('./src/types', import.meta.url)),
      utils: fileURLToPath(new URL('./src/utils', import.meta.url)),
    },
  },
  build: {
    outDir: 'build',
  },
  server: {
    host: '0.0.0.0',
    port: 3101,
    proxy: {
      '/api': {
        target: 'http://backend:3100',
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
