import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        proxy: {
            '/api': 'http://localhost:5000',
        },
    },
    plugins: [react()],
    resolve: {
        alias: {
            process: 'process/browser',  // Ensure compatibility
        },
    },
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: 'globalThis',  // Fix "global is not defined" error
            },
        },
    },
});
