import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Custom domain reviewlense.com serves at root, not at /reviewlense/.
  // The CNAME file in public/ tells GitHub Pages to use the custom domain.
  base: '/',
});
