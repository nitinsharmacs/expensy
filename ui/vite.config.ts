import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
  server: {
    port: 8000,
    proxy: {
      '/api': {
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
    manifest: true,
    minify: true,
    emptyOutDir: true,
    copyPublicDir: true,
  },
});
