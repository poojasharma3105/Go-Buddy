import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  build: {
    chunkSizeWarningLimit: 1000, // Set limit in KB (1000 KB = 1 MB)
  },
})
