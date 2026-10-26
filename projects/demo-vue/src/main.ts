import { createApp } from 'vue'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import './style.css'
import App from './App.vue'
import { bxRestPlugin } from './bxRestPlugin'

// Стандартная для Vite настройка воркеров monaco-editor — без неё
// TypeScript-подсказки в редакторе не заработают. Сам monaco-editor
// импортируется в CodeEditor.vue, который грузится лениво (см. App.vue).
self.MonacoEnvironment = {
  getWorker(_workerId: string, label: string) {
    if (label === 'typescript' || label === 'javascript') return new tsWorker()
    return new editorWorker()
  }
}

const app = createApp(App)
app.use(bxRestPlugin)
app.mount('#app')
