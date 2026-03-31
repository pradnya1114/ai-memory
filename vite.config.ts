import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 'base: ./' is critical for GoDaddy shared hosting. 
  // It ensures assets are linked relatively (e.g., "./assets/...") 
  // instead of absolutely ("/assets/..."), preventing 404s in subfolders.
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});