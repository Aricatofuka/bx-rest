import { formatResultValueHtml, t, type SandboxResult } from 'bx-rest-demo-shared'

interface Props {
  results: SandboxResult[]
}

export function ResultPanel({ results }: Props) {
  if (results.length === 0) {
    return <p className="result-panel__empty">{t.results.empty}</p>
  }

  return (
    <div className="result-panel">
      {results.map(result => (
        <div key={result.callId} className={`result-card result-card--${result.status}`}>
          <div className="result-card__header">
            <span>{t.results.callLabel(result.callId)}</span>
            <span>{t.results.status[result.status]}</span>
          </div>
          {result.status !== 'pending' && (
            // formatResultValueHtml сама экранирует данные ответа и оборачивает
            // только JSON-токены в <span> — безопасно вставлять как HTML.
            <pre className="result-card__body" dangerouslySetInnerHTML={{ __html: formatResultValueHtml(result.value) }} />
          )}
        </div>
      ))}
    </div>
  )
}
