import { fileURLToPath, URL } from 'node:url';
import AutoImport from 'unplugin-auto-import/vite';
import VueRouter from 'unplugin-vue-router/vite';
import Components from 'unplugin-vue-components/vite';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VueRouterAutoImports } from 'unplugin-vue-router';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      routesFolder: fileURLToPath(new URL('./src/pages', import.meta.url)),
      dts: './typed-router.d.ts'
    }),

    vue({
      reactivityTransform: true
    }),

    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: [
        'vue',
        '@vueuse/core',
        'vee-validate',
        'vue-i18n',
        VueRouterAutoImports,
        {
          '@tanstack/vue-query': [
            'useQuery',
            'useQueries',
            'useMutation',
            'useInfiniteQuery',
            'useQueryClient'
          ]
        }
      ],
      dirs: ['./src/features/**/composables', './src/features/**/composables/**']
    }),

    Components({
      dts: true,
      extensions: ['vue'],
      globs: ['./src/features/**/components/**/*.vue'],
      directoryAsNamespace: false
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
