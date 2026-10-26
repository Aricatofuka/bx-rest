import Editor, { loader, type BeforeMount } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { configureBxRestTypes, DEFAULT_EDITOR_OPTIONS } from 'bx-rest-demo-shared'

// Грузим monaco-editor из локального node_modules (без обращения к CDN).
// Модуль импортируется лениво (см. App.tsx), поэтому monaco попадает в
// отдельный чанк, а не в стартовый бандл.
loader.config({ monaco })

interface Props {
  value: string
  onChange: (value: string) => void
}

const handleBeforeMount: BeforeMount = monaco => {
  // Реальные типы bx-rest + ambient bxRest/show — см. demo-shared/monacoSetup.ts.
  configureBxRestTypes(monaco)
}

export function CodeEditor({ value, onChange }: Props) {
  return (
    <Editor
      height="360px"
      defaultLanguage="typescript"
      path="file:///snippet.ts"
      theme="vs-dark"
      value={value}
      onChange={next => onChange(next ?? '')}
      beforeMount={handleBeforeMount}
      options={DEFAULT_EDITOR_OPTIONS}
    />
  )
}
