import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Стартовый чанк маленький (~0.5 МБ), но в ленивых чанках неизбежно лежат
    // целиком typescript (~3.4 МБ, sandbox.ts), monaco-editor (~2.3 МБ) и
    // сгенерированные .d.ts (~1.5 МБ) — дробить их дальше бессмысленно.
    // Порог чуть выше самого крупного из них: если monaco или typescript
    // снова попадут в стартовый чанк, предупреждение всё равно сработает.
    chunkSizeWarningLimit: 3500
  }
})
