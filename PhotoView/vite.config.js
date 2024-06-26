import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/photoview',
  server: {
    https: false,
    watch: {
      usePolling: true,
      interval: 100, // Check files every 100ms
    },
  },
  plugins: [vue()],
})