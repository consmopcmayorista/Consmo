import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { copyFileSync } from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // ✅ mover closeBundle a un plugin de Vite
    {
      name: 'copy-htaccess',
      closeBundle() {
        try {
          copyFileSync(
            path.resolve('public/.htaccess'),
            path.resolve('dist/.htaccess')
          )
          console.log('✅ .htaccess copiado a dist/')
        } catch (error) {
          console.error('⚠️ Error copiando .htaccess:', error)
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  optimizeDeps: {
    include: ['@vue-leaflet/vue-leaflet', 'leaflet']
  },
  build: {
    commonjsOptions: {
      include: [/@vue-leaflet\/vue-leaflet/, /node_modules/]
    },
    emptyOutDir: false,
    outDir: 'dist',
  },
  base: '/',
  server: {
    // ❌ historyApiFallback: true,  (no existe en Vite)
    // ✅ proxy para tu endpoint de firma (servidor local en 5174)
    proxy: {
      '/api': {
        target: 'http://localhost:5174',
        changeOrigin: true
      }
    }
  }
})
