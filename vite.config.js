import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/ssc/',
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: true,
    cors: true
  }
})
