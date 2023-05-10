import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
<<<<<<< HEAD
      resolvers: [VantResolver()]
=======
      resolvers: [VantResolver()],
>>>>>>> e819ed6781475d87c0169de7a303d5ba24e92dd8
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://new.mxjclub.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          Authorization: '7fa3177f-a9cb-4adc-8512-622554f7a09f',
<<<<<<< HEAD
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }
    }
  }
=======
          "Content-Type": 'application/json; charset=UTF-8'
        },
      },
    },
  },

>>>>>>> e819ed6781475d87c0169de7a303d5ba24e92dd8
})
