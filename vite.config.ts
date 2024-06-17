import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      formats: ['es'],
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'v-valid',
      fileName: 'v-valid',
    },
    rollupOptions: {
      external: ['vue-demi', '@types/lodash-es'],
    },
  },
  plugins: [
    dts({
      rollupTypes: true,
    }),
  ],
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
})
