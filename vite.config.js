// vite.config.js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { copyFileSync, existsSync } from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),

    // Copiar .htaccess SOLO al finalizar el build (no se ejecuta en dev)
    {
      name: 'copy-htaccess',
      apply: 'build',
      closeBundle() {
        try {
          const src = path.resolve('public/.htaccess')
          const dst = path.resolve('dist/.htaccess')
          if (existsSync(src)) {
            copyFileSync(src, dst)
            console.log('✅ .htaccess copiado a dist/')
          } else {
            console.warn('⚠️ No se encontró public/.htaccess, se omite copia.')
          }
        } catch (error) {
          console.warn('⚠️ Error copiando .htaccess:', error?.message || error)
        }
      }
    }
  ],

  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },

  // Si ya tenías optimizeDeps/build/base, puedes mantenerlos aquí
  optimizeDeps: {
    include: ['@vue-leaflet/vue-leaflet', 'leaflet']
  },
  build: {
    commonjsOptions: {
      include: [/@vue-leaflet\/vue-leaflet/, /node_modules/]
    },
    emptyOutDir: false,
    outDir: 'dist'
  },
  base: '/',

  // Dev server con proxy a /wompi → backend local
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    proxy: {
      '/wompi': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
