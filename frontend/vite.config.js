import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    allowedHosts: ['4bf6b302-bb00-4aa3-907f-ad009201afe3.preview.emergentagent.com']
  },
  build: {
    outDir: 'dist'
  }
})
