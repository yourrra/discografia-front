import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  publicDir: 'public',
  plugins: [react({})],
  server: {
    port: 5173,
    host: true,
    open: false,
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    alias: {
      // FSD слои
      '@/app': resolve(__dirname, './src/app'),
      '@/pages': resolve(__dirname, './src/pages'),
      '@/widgets': resolve(__dirname, './src/widgets'),
      '@/features': resolve(__dirname, './src/features'),
      '@/entities': resolve(__dirname, './src/entities'),
      '@/shared': resolve(__dirname, './src/shared'),

      // Быстрый доступ к shared сегментам
      '@/shared/ui': resolve(__dirname, './src/shared/ui'),
      '@/shared/lib': resolve(__dirname, './src/shared/lib'),
      '@/shared/api': resolve(__dirname, './src/shared/api'),
      '@/shared/config': resolve(__dirname, './src/shared/config'),
      '@/shared/assets': resolve(__dirname, './src/shared/assets'),

      // Корневой алиас для совместимости
      '@': resolve(__dirname, './src'),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@vite/client', '@vite/env'],
  },
})
