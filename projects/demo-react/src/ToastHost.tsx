import { useEffect, useState } from 'react'
import { onStorageWarning, t } from 'bx-rest-demo-shared'

const AUTO_HIDE_MS = 7000

/**
 * Слушает предупреждения о сбоях хранилища (см. bx-rest-demo-shared/notifications.ts)
 * и показывает короткий тост — полная ошибка уже ушла в консоль на момент события.
 */
export function ToastHost() {
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => onStorageWarning(warning => setMessage(warning.message)), [])

  useEffect(() => {
    if (message === null) return
    const timer = setTimeout(() => setMessage(null), AUTO_HIDE_MS)
    return () => clearTimeout(timer)
  }, [message])

  if (message === null) return null

  return (
    <div className="toast" role="alert">
      <span>{message}</span>
      <button type="button" className="toast__close" aria-label={t.toast.close} onClick={() => setMessage(null)}>
        ×
      </button>
    </div>
  )
}
