import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // every backend path already starts with /api, so forward it unchanged (no rewrite)
      '/api': 'http://localhost:8080',
    },
  },
})
