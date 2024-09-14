import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath} from "url";

export default defineConfig(({mode })=> {
  const env = loadEnv(mode, process.cwd(), '');
  const isProd = env.NODE_ENV === 'production';

  return {
    plugins: [vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag === 'perfree-comment' || tag === 'emoji-picker'
        }
      }
    })],
    server: {
      port: 4204,
      host: '0.0.0.0',
      open: false,
      proxy: {
        "/api": {
          target: 'http://127.0.0.1:8080/api',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        },
        "/static": {
          target: 'http://127.0.0.1:8080/static',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/static/, '')
        },
      }
    },
    resolve: {
      alias: {
        'vue': isProd ? 'vue/dist/vue.runtime.esm-browser.prod.js' : 'vue/dist/vue.runtime.esm-browser.js',
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
    },
    build: {
      target: 'esnext',
      minify: 'terser',
      lib: {
        entry: 'src/main.js',
        formats: ['es', 'cjs', 'iife'],
        name: 'CustomElement'
      }
    }
  }
})
