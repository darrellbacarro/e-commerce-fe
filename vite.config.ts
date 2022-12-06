import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      ignored: ['!**/node_modules/react-redux/**']
    }
  },
  plugins: [react(), eslint()]
});
