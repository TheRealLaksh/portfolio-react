import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // FIX: Removed unused 'proxy' config since hooks now use absolute URLs/Env Vars.
    // Added 'host: true' to expose the server to your local network for mobile testing.
    host: true, 
    port: 5173,
  }
})