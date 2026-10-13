import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // The React dev server forwards every request starting with /api
      // to the Express backend running on port 5000.
      // This lets the frontend call "/api/records" instead of
      // "http://localhost:5000/api/records".
      '/api': 'http://localhost:5000',
    },
  },
});
