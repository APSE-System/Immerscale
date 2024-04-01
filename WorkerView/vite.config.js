import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
    watch: {
      usePolling: true,
      interval: 100, // Check files every 100ms
    },
  },
  plugins: [vue()],
})
