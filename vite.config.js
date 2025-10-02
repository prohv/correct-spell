import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        content: 'src/content/index.tsx',
        background: 'src/background/service-worker.ts',
        popup: 'src/popup/main.tsx'
      },
      output: {
        entryFileNames: (chunkInfo) => {
          // Output content script and background script in the right place for the extension
          if (chunkInfo.name === 'content') {
            return 'content.js';
          } else if (chunkInfo.name === 'background') {
            return 'background.js';
          } else if (chunkInfo.name === 'popup') {
            return 'popup.js';
          }
          return 'assets/[name]-[hash].js';
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/[name].[ext]';
          }
          return 'assets/[name]-[hash].[ext]';
        },
        dir: 'dist'
      }
    },
    outDir: 'dist'
  }
})