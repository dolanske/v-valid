import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'
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
      external: ['vue'],
    },
  },
  plugins: [
    dts({
      rollupTypes: true,
    }),
  ],
  test: {
    include: ['test/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**'],
    },
  },
})
