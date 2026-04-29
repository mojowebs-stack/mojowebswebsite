import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom', 'react-router-dom'],
          'vendor-three':  ['three'],
          'vendor-motion': ['framer-motion'],
          'vendor-supa':   ['@supabase/supabase-js'],
        } as Record<string, string[]>,
      },
    },
    // Raise the warning limit — Three.js is intentionally large
    chunkSizeWarningLimit: 800,
  },
});
