import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { loader } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import App from './App.tsx'
import './index.css'

// Грузим monaco-editor из локального node_modules (без обращения к CDN) и
// настраиваем воркеры так, как рекомендует сам monaco-editor для Vite —
// без этого TypeScript-подсказки в редакторе просто не заработают.
self.MonacoEnvironment = {
  getWorker(_workerId: string, label: string) {
    if (label === 'typescript' || label === 'javascript') return new tsWorker()
    return new editorWorker()
  }
}
loader.config({ monaco })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
