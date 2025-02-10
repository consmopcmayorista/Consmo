import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { copyFileSync } from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
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
    emptyOutDir: false, // No borra la carpeta dist en cada build
    outDir: 'dist', // Carpeta de salida
  },
  base: '/',
  server: {
    historyApiFallback: true, // Permite que Vite maneje rutas SPA
  },
  // Hook post-build para copiar el .htaccess
  async closeBundle() {
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
})
