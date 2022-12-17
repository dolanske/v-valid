import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'v-valid',
      fileName: 'v-valid',
    },
    rollupOptions: {
      external: ['vue-demi', '@types/lodash-es'],
    },
  },
})
