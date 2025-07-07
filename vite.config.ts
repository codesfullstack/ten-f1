import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh'
export default defineConfig({
  plugins: [
    react(),
    reactRefresh()
  ],
  define: {
    'process.env.VITE_API_KEY_GEO': JSON.stringify(process.env.VITE_API_KEY_GEO)
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://xxxxxxxxx./',
        changeOrigin: true,
      },
    },
  },
})
