import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file for the current mode
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    // Define process.env variables to be available in the client-side code
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    },
  };
});
