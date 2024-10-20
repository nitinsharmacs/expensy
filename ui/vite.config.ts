import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'

const getServiceWorkerScripts = () =>
  ['<script src="/register.js"></script>'].join('');

const insertInHeadSection = (html: string, content) => {
  const headIndex = html.indexOf('</head>');

  const htmlChunk1 = html.slice(0, headIndex);
  const htmlChunk2 = html.slice(headIndex);

  return htmlChunk1 + content + htmlChunk2;
};

const insertScripts = (indexHTML: string) => {
  return insertInHeadSection(indexHTML, getServiceWorkerScripts());
};

const insertManifest = (indexHTML: string) =>
  insertInHeadSection(indexHTML, '<link rel="manifest" href="/manifest.json">');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'service-worker',
      apply: 'build',
      async transformIndexHtml(html) {
        return insertManifest(insertScripts(html));
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components')
    }
  },
  server: {
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
      },
      '/ping': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
      },
    },
  },
  publicDir: './public',
  build: {
    outDir: 'build',
    assetsDir: 'static',
    sourcemap: true,
    minify: true,
    emptyOutDir: true,
    copyPublicDir: true,
  },
  test: {
    globals: true,
    threads: false,
    environment: 'jsdom',
    css: true,
    setupFiles: './test/testConfigs/setupTests.ts',
    env: {
      VITE_BASE_URL: 'http://localhost:3000/backend',
    },
    testTimeout: 240000,
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html', 'clover', 'json'],
      // exclude: ['src/mocks/*', 'src/*/*.test.tsx', 'src/testConfigs/*'],
      branches: 60,
      statements: 80,
      functions: 80,
      lines: 80,
    },
  },
});
