import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: 'https://caionapoles.github.io/elba/',
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'Elba',
        short_name: 'Elba',
        description: 'A web application for comparing gasoline and ethanol prices based on the fuel consumption of the user\'s car.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#007bff',
        icons: [
          {
            src: '/icons/iconTest192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/iconTest512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        lang: 'en-US',
      }
    })
  ]
});