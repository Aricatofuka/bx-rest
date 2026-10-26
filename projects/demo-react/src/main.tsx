import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import App from './App.tsx'
import './index.css'

// Настраиваем воркеры monaco-editor так, как рекомендует сам monaco-editor
// для Vite — без этого TypeScript-подсказки в редакторе просто не заработают.
// Сам monaco-editor подключается в CodeEditor.tsx, который грузится лениво.
self.MonacoEnvironment = {
  getWorker(_workerId: string, label: string) {
    if (label === 'typescript' || label === 'javascript') return new tsWorker()
    return new editorWorker()
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
