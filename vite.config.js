import { fileURLToPath, URL } from 'node:url'
import cesium from 'vite-plugin-cesium';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    cesium({
      rebuildCesium: true
    })
  ],
  server: {
    proxy: {
      '/mapspro': 'https://www.gstatic.com/mapspro/images/stock'
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
