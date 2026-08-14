import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import viteCompression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true
      }
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz'
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br'
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheKeyWillBeUsed: async ({ request }) => {
                return `${request.url}?${Date.now()}`
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Joseph A Maurer - Software Engineer',
        short_name: 'Joe Maurer',
        description: 'Portfolio for Joseph A Maurer, a Software Engineer',
        theme_color: '#e4b861',
        background_color: '#121314',
        display: 'standalone',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '16x16 32x32 48x48 64x64',
            type: 'image/x-icon'
          },
          {
            src: 'apple-touch-icon-precomposed.png',
            sizes: '180x180',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['jquery', 'bootstrap'],
          vanta: [
            'js/Vanta/three.min.js',
            'js/Vanta/p5.min.js',
            'js/Vanta/Globe.min.js',
            'js/Vanta/Net.min.js',
            'js/Vanta/Dots.min.js',
            'js/Vanta/Topology.min.js',
            'js/Vanta/Waves.min.js'
          ]
        }
      }
    },
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 4173
  }
}) 