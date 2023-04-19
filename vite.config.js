import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 本地端不加
  base: process.env.NODE_ENV === 'production' ? '/ParkTPE/' : '/',
  plugins: [react()],
  server: {
    port: 5024,
  }
})
