import { useState } from 'react'
import { mergeSandboxResult, recipes, runSnippet, t, type SandboxResult } from 'bx-rest-demo-shared'
import { bxRest } from './bxRest'
import { useConnection } from './useConnection'
import { ConnectionForm } from './ConnectionForm'
import { RecipePicker } from './RecipePicker'
import { CodeEditor } from './CodeEditor'
import { ResultPanel } from './ResultPanel'
import { ToastHost } from './ToastHost'
import './App.css'

export default function App() {
  const { connection, setConnection, applied, connect, isValid } = useConnection()
  const [code, setCode] = useState(recipes[0].code)
  const [results, setResults] = useState<SandboxResult[]>([])

  const run = () => {
    setResults([])
    runSnippet(code, {
      bxRest,
      onResult: result => {
        setResults(prev => mergeSandboxResult(prev, result))
      }
    })
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>{t.app.title('React')}</h1>
        <p>{t.app.subtitle}</p>
      </header>

      <ConnectionForm
        connection={connection}
        onChange={setConnection}
        onConnect={connect}
        applied={applied}
        isValid={isValid}
      />

      <main className="app__main">
        <section className="app__editor">
          <RecipePicker onPick={recipe => setCode(recipe.code)} />
          <CodeEditor value={code} onChange={setCode} />
          <button type="button" className="run-button" disabled={!applied} onClick={run}>
            {t.editor.runButton}
          </button>
          {!applied && <p className="app__hint">{t.editor.connectFirstHint}</p>}
        </section>

        <section className="app__results">
          <h2>{t.results.heading}</h2>
          <ResultPanel results={results} />
        </section>
      </main>

      <ToastHost />
    </div>
  )
}
