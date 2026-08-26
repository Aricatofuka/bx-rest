import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['projects/bx-rest/src/**/*.spec.ts'],
    environment: 'node', // тестируем логику, DOM не нужен
    setupFiles: ['./vitest.setup.ts'],
  },
})
