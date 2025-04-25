import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // 👈 
    },
    host: true, // 👈 Allows access via localhost or LAN
  },
})
