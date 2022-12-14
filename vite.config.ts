import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'v-validate',
      fileName: 'v-validate',
    },
    rollupOptions: {
      external: ['vue-demi', '@types/lodash-es'],
    },
  },
})
