import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import jsconfigPaths from "vite-jsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
    tailwindcss(),
      jsconfigPaths(),
  ],
    server: {
        proxy: {
            '/api': {
                target: 'https://educonnect-backend-t7j1.onrender.com',
                changeOrigin: true,
                secure: true,
            },
        },
    }
})
